import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Mail, Trophy, ShoppingBag, Calendar } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface LoyaltyPoints {
  points: number;
  lifetime_points: number;
}

interface Purchase {
  id: string;
  created_at: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  points_earned: number;
  sweet: {
    name: string;
    image_url: string | null;
  } | null;
}

const Profile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints>({ points: 0, lifetime_points: 0 });
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      fetchProfile();
      fetchLoyaltyPoints();
      fetchPurchases();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    const admin = await isAdmin(user.id);
    setIsUserAdmin(admin);
  };

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile(data);
    }
    setIsLoading(false);
  };

  const fetchLoyaltyPoints = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('loyalty_points')
      .select('points, lifetime_points')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching loyalty points:", error);
    } else if (data) {
      setLoyaltyPoints(data);
    }
  };

  const fetchPurchases = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('purchases')
      .select(`
        *,
        sweet:sweets(id, name, image_url)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching purchases:", error);
    } else {
      setPurchases(data || []);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navbar isAdmin={isUserAdmin} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar isAdmin={isUserAdmin} />
      
      <main className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-candy bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-gradient-candy text-white text-2xl">
                    {profile?.full_name 
                      ? profile.full_name.charAt(0).toUpperCase() 
                      : user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email || user?.email}</p>
                  </div>
                </div>
                
                {profile?.full_name && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{profile.full_name}</p>
                    </div>
                  </div>
                )}
                
                {isUserAdmin && (
                  <Badge variant="secondary" className="w-full justify-center">
                    Administrator
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Loyalty Points */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Loyalty Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {loyaltyPoints.points}
                </div>
                <p className="text-sm text-muted-foreground">Current Points</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-muted-foreground mb-2">
                  {loyaltyPoints.lifetime_points}
                </div>
                <p className="text-sm text-muted-foreground">Lifetime Points</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {purchases.length}
                </div>
                <p className="text-sm text-muted-foreground">Recent Orders</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-muted-foreground mb-2">
                  ₹{purchases.reduce((sum, p) => sum + p.total_price, 0).toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase History */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Purchase History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {purchases.length > 0 ? (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                  >
                    {purchase.sweet && (
                      <>
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0">
                          {purchase.sweet.image_url ? (
                            <img
                              src={purchase.sweet.image_url}
                              alt={purchase.sweet.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{purchase.sweet.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {purchase.quantity} × ₹{purchase.unit_price.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(purchase.created_at)}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ₹{purchase.total_price.toFixed(2)}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            +{purchase.points_earned} pts
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No purchases yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start shopping to see your purchase history here!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;

