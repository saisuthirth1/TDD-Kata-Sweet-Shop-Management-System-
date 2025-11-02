# Setup Indian Sweets in Your Database

Since the sweet names are stored in your Supabase database, you need to either:
1. Update them manually in the Supabase Dashboard
2. Run the SQL migration file

## Option 1: Update via Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://wdlbncgiusmvhctduapm.supabase.co
2. Log in to your project
3. Navigate to **SQL Editor**
4. Copy and paste the SQL from the file: `supabase/migrations/20251101130000_seed_indian_sweets.sql`
5. Click **Run** to execute the SQL

This will:
- Delete all existing sweets
- Insert Indian sweets with proper images

## Option 2: Run Python Script

If you have Python installed:

1. Install required package:
   ```bash
   pip install supabase python-dotenv
   ```

2. Run the seeding script:
   ```bash
   python seed_indian_sweets.py
   ```

## Option 3: Manual Database Updates

Go to Supabase Dashboard → Table Editor → sweets table and manually update each sweet.

---

**Important:** After updating the database, refresh your browser to see the Indian sweets!

