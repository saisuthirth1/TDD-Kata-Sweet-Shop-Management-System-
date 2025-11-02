"""
Script to seed Indian sweets data into Supabase database.
Make sure you have the supabase-py library installed:
pip install supabase
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://wdlbncgiusmvhctduapm.supabase.co')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_PUBLISHABLE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbGJuY2dpdXNtdmhjdGR1YXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTU1NDEsImV4cCI6MjA3NzU3MTU0MX0.6rgHVh4TbU0IPyPMkpOLA3ZAxK0iILbvqdPh8NQq4Nc')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Indian sweets data
indian_sweets = [
    # Halwa
    {'name': 'Gajar Halwa', 'category': 'chocolate', 'description': 'Traditional carrot halwa made with fresh carrots, milk, and cardamom', 'price': 75.00, 'quantity': 50, 'image_url': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop'},
    {'name': 'Moong Dal Halwa', 'category': 'chocolate', 'description': 'Rich and creamy yellow lentil halwa garnished with almonds', 'price': 85.00, 'quantity': 40, 'image_url': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop'},
    {'name': 'Sooji Halwa', 'category': 'chocolate', 'description': 'Semolina halwa with ghee, sugar, and dried fruits', 'price': 65.00, 'quantity': 60, 'image_url': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop'},
    
    # Laddu
    {'name': 'Boondi Laddu', 'category': 'candy', 'description': 'Traditional sweet balls made from chickpea flour droplets', 'price': 60.00, 'quantity': 55, 'image_url': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'},
    {'name': 'Besan Laddu', 'category': 'candy', 'description': 'Gram flour laddu sweetened with sugar and flavored with cardamom', 'price': 70.00, 'quantity': 45, 'image_url': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'},
    {'name': 'Rava Laddu', 'category': 'candy', 'description': 'Semolina-based sweet laddu with coconut and nuts', 'price': 55.00, 'quantity': 50, 'image_url': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'},
    
    # Barfi
    {'name': 'Kaju Barfi', 'category': 'gummy', 'description': 'Cashew fudge - creamy and rich traditional sweet', 'price': 120.00, 'quantity': 35, 'image_url': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'},
    {'name': 'Besan Barfi', 'category': 'gummy', 'description': 'Chickpea flour fudge with a hint of cardamom', 'price': 80.00, 'quantity': 50, 'image_url': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'},
    {'name': 'Badam Barfi', 'category': 'gummy', 'description': 'Almond fudge - melt-in-mouth deliciousness', 'price': 110.00, 'quantity': 40, 'image_url': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop'},
    {'name': 'Chocolate Barfi', 'category': 'gummy', 'description': 'Modern twist on traditional barfi with cocoa', 'price': 90.00, 'quantity': 45, 'image_url': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'},
    
    # Gulab Jamun
    {'name': 'Gulab Jamun', 'category': 'lollipop', 'description': 'Soft and spongy milk dumplings soaked in sugar syrup', 'price': 70.00, 'quantity': 60, 'image_url': 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=400&h=400&fit=crop'},
    {'name': 'Kala Jamun', 'category': 'lollipop', 'description': 'Caramelized dark gulab jamun with rich flavor', 'price': 85.00, 'quantity': 45, 'image_url': 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=400&h=400&fit=crop'},
    {'name': 'Stuffed Gulab Jamun', 'category': 'lollipop', 'description': 'Gulab jamun stuffed with khoya and nuts', 'price': 100.00, 'quantity': 35, 'image_url': 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=400&h=400&fit=crop'},
    
    # Jalebi
    {'name': 'Sweet Jalebi', 'category': 'marshmallow', 'description': 'Crispy spirals of fermented batter soaked in sugar syrup', 'price': 50.00, 'quantity': 70, 'image_url': 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=400&fit=crop'},
    {'name': 'Hot Jalebi', 'category': 'marshmallow', 'description': 'Freshly made warm jalebi - perfect for celebrations', 'price': 60.00, 'quantity': 65, 'image_url': 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=400&fit=crop'},
    
    # Rasgulla
    {'name': 'Rasgulla', 'category': 'licorice', 'description': 'Soft and spongy cottage cheese balls in light sugar syrup', 'price': 65.00, 'quantity': 80, 'image_url': 'https://images.unsplash.com/photo-1631459035699-509af1d3e99e?w=400&h=400&fit=crop'},
    {'name': 'Strawberry Rasgulla', 'category': 'licorice', 'description': 'Twisted rasgulla with strawberry flavor', 'price': 75.00, 'quantity': 50, 'image_url': 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=400&fit=crop'},
    
    # Other Sweets
    {'name': 'Modak', 'category': 'hard_candy', 'description': 'Traditional Maharashtrian sweet dumplings for festivals', 'price': 90.00, 'quantity': 40, 'image_url': 'https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=400&h=400&fit=crop'},
    {'name': 'Mysore Pak', 'category': 'hard_candy', 'description': 'Rich sweet made from gram flour, ghee, and sugar', 'price': 95.00, 'quantity': 45, 'image_url': 'https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=400&h=400&fit=crop'},
    {'name': 'Soan Papdi', 'category': 'hard_candy', 'description': 'Flaky sweet made from gram flour and sugar', 'price': 70.00, 'quantity': 55, 'image_url': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'},
    {'name': 'Peda', 'category': 'hard_candy', 'description': 'Soft milk-based sweet from Gujarat', 'price': 85.00, 'quantity': 50, 'image_url': 'https://images.unsplash.com/photo-1631459035699-509af1d3e99e?w=400&h=400&fit=crop'},
    {'name': 'Malpua', 'category': 'sour', 'description': 'Sweetened fried pancakes soaked in sugar syrup', 'price': 65.00, 'quantity': 60, 'image_url': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop'},
    {'name': 'Rasmalai', 'category': 'sour', 'description': 'Soft paneer discs in creamy sweetened milk', 'price': 95.00, 'quantity': 45, 'image_url': 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&h=400&fit=crop'},
    {'name': 'Kheer', 'category': 'sour', 'description': 'Traditional rice pudding with milk and cardamom', 'price': 70.00, 'quantity': 65, 'image_url': 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&h=400&fit=crop'},
]

def seed_sweets():
    """Seed Indian sweets into the database"""
    print("Starting to seed Indian sweets...")
    
    # First, clear existing sweets
    print("Clearing existing sweets...")
    try:
        result = supabase.table('sweets').delete().neq('id', '00000000-0000-0000-0000-000000000000').execute()
        print(f"Cleared existing sweets: {result}")
    except Exception as e:
        print(f"Note: {e}")
    
    # Insert new sweets
    print("\nInserting Indian sweets...")
    for sweet in indian_sweets:
        try:
            result = supabase.table('sweets').insert(sweet).execute()
            print(f"✓ Inserted: {sweet['name']}")
        except Exception as e:
            print(f"✗ Failed to insert {sweet['name']}: {e}")
    
    print("\n✓ Seeding complete!")

if __name__ == "__main__":
    seed_sweets()

