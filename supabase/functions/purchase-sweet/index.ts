import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      throw new Error('Unauthorized');
    }

    const { sweetId, quantity = 1 } = await req.json();

    if (!sweetId) {
      throw new Error('Sweet ID is required');
    }

    console.log(`Processing purchase for user ${user.id}, sweet ${sweetId}, quantity ${quantity}`);

    // Get sweet details
    const { data: sweet, error: sweetError } = await supabaseClient
      .from('sweets')
      .select('*')
      .eq('id', sweetId)
      .single();

    if (sweetError || !sweet) {
      console.error('Sweet fetch error:', sweetError);
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    // Calculate totals
    const totalPrice = Number(sweet.price) * quantity;
    const pointsEarned = Math.floor(totalPrice / 10); // 1 point per ₹10

    console.log(`Total: ₹${totalPrice}, Points: ${pointsEarned}`);

    // Start transaction-like operations
    // 1. Update sweet quantity
    const { error: updateError } = await supabaseClient
      .from('sweets')
      .update({ quantity: sweet.quantity - quantity })
      .eq('id', sweetId);

    if (updateError) {
      console.error('Update sweet error:', updateError);
      throw new Error('Failed to update stock');
    }

    // 2. Create purchase record
    const { error: purchaseError } = await supabaseClient
      .from('purchases')
      .insert({
        user_id: user.id,
        sweet_id: sweetId,
        quantity: quantity,
        unit_price: sweet.price,
        total_price: totalPrice,
        points_earned: pointsEarned,
      });

    if (purchaseError) {
      console.error('Purchase insert error:', purchaseError);
      // Try to rollback sweet quantity
      await supabaseClient
        .from('sweets')
        .update({ quantity: sweet.quantity })
        .eq('id', sweetId);
      throw new Error('Failed to create purchase record');
    }

    // 3. Update loyalty points
    const { data: loyaltyData, error: loyaltyFetchError } = await supabaseClient
      .from('loyalty_points')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (loyaltyFetchError) {
      console.error('Loyalty fetch error:', loyaltyFetchError);
    }

    if (loyaltyData) {
      const { error: loyaltyUpdateError } = await supabaseClient
        .from('loyalty_points')
        .update({
          points: loyaltyData.points + pointsEarned,
          lifetime_points: loyaltyData.lifetime_points + pointsEarned,
        })
        .eq('user_id', user.id);

      if (loyaltyUpdateError) {
        console.error('Loyalty update error:', loyaltyUpdateError);
      }
    }

    console.log('Purchase completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        pointsEarned,
        totalPrice 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Purchase error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
