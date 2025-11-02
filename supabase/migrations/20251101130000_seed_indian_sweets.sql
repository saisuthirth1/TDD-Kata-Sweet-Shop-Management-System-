-- Seed Indian Sweets data
-- This migration populates the sweets table with Indian sweets

-- First, clear existing sweets if any
DELETE FROM public.sweets;

-- Insert Indian sweets
INSERT INTO public.sweets (name, category, description, price, quantity, image_url) VALUES
-- Halwa
('Gajar Halwa', 'chocolate', 'Traditional carrot halwa made with fresh carrots, milk, and cardamom', 75.00, 50, 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop'),
('Moong Dal Halwa', 'chocolate', 'Rich and creamy yellow lentil halwa garnished with almonds', 85.00, 40, 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop'),
('Sooji Halwa', 'chocolate', 'Semolina halwa with ghee, sugar, and dried fruits', 65.00, 60, 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop'),

-- Laddu
('Boondi Laddu', 'candy', 'Traditional sweet balls made from chickpea flour droplets', 60.00, 55, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'),
('Besan Laddu', 'candy', 'Gram flour laddu sweetened with sugar and flavored with cardamom', 70.00, 45, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'),
('Rava Laddu', 'candy', 'Semolina-based sweet laddu with coconut and nuts', 55.00, 50, 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=400&fit=crop'),

-- Barfi
('Kaju Barfi', 'gummy', 'Cashew fudge - creamy and rich traditional sweet', 120.00, 35, 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'),
('Besan Barfi', 'gummy', 'Chickpea flour fudge with a hint of cardamom', 80.00, 50, 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'),
('Badam Barfi', 'gummy', 'Almond fudge - melt-in-mouth deliciousness', 110.00, 40, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop'),
('Chocolate Barfi', 'gummy', 'Modern twist on traditional barfi with cocoa', 90.00, 45, 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'),

-- Gulab Jamun
('Gulab Jamun', 'lollipop', 'Soft and spongy milk dumplings soaked in sugar syrup', 70.00, 60, 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=400&h=400&fit=crop'),
('Kala Jamun', 'lollipop', 'Caramelized dark gulab jamun with rich flavor', 85.00, 45, 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=400&h=400&fit=crop'),
('Stuffed Gulab Jamun', 'lollipop', 'Gulab jamun stuffed with khoya and nuts', 100.00, 35, 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=400&h=400&fit=crop'),

-- Jalebi
('Sweet Jalebi', 'marshmallow', 'Crispy spirals of fermented batter soaked in sugar syrup', 50.00, 70, 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=400&fit=crop'),
('Hot Jalebi', 'marshmallow', 'Freshly made warm jalebi - perfect for celebrations', 60.00, 65, 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=400&fit=crop'),

-- Rasgulla
('Rasgulla', 'licorice', 'Soft and spongy cottage cheese balls in light sugar syrup', 65.00, 80, 'https://images.unsplash.com/photo-1631459035699-509af1d3e99e?w=400&h=400&fit=crop'),
('Strawberry Rasgulla', 'licorice', 'Twisted rasgulla with strawberry flavor', 75.00, 50, 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=400&fit=crop'),

-- Other Sweets
('Modak', 'hard_candy', 'Traditional Maharashtrian sweet dumplings for festivals', 90.00, 40, 'https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=400&h=400&fit=crop'),
('Mysore Pak', 'hard_candy', 'Rich sweet made from gram flour, ghee, and sugar', 95.00, 45, 'https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=400&h=400&fit=crop'),
('Soan Papdi', 'hard_candy', 'Flaky sweet made from gram flour and sugar', 70.00, 55, 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=400&h=400&fit=crop'),
('Peda', 'hard_candy', 'Soft milk-based sweet from Gujarat', 85.00, 50, 'https://images.unsplash.com/photo-1631459035699-509af1d3e99e?w=400&h=400&fit=crop'),
('Malpua', 'sour', 'Sweetened fried pancakes soaked in sugar syrup', 65.00, 60, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop'),
('Rasmalai', 'sour', 'Soft paneer discs in creamy sweetened milk', 95.00, 45, 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&h=400&fit=crop'),
('Kheer', 'sour', 'Traditional rice pudding with milk and cardamom', 70.00, 65, 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&h=400&fit=crop');

-- Update category enum to include Indian sweet categories (if needed in future)
-- For now, we're using existing categories and mapping them to Indian sweets

