// Indian Sweets Data - No database needed!

export interface IndianSweet {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export const indianSweets: IndianSweet[] = [
  {
    id: '1',
    name: 'Gajar Halwa',
    category: 'halwa',
    description: 'Traditional carrot halwa made with fresh carrots, milk, and cardamom',
    price: 75.00,
    quantity: 15,
    image_url: '/sweetpic/image1.png',
  },
  {
    id: '4',
    name: 'Boondi Laddu',
    category: 'candy',
    description: 'Traditional sweet balls made from chickpea flour droplets',
    price: 60.00,
    quantity: 12,
    image_url: '/sweetpic/image2.png',
  },
  {
    id: '5',
    name: 'Besan Laddu',
    category: 'candy',
    description: 'Gram flour laddu sweetened with sugar and flavored with cardamom',
    price: 70.00,
    quantity: 18,
    image_url: '/sweetpic/image3.png',
  },
  {
    id: '11',
    name: 'Gulab Jamun',
    category: 'milk_sweet',
    description: 'Soft and spongy milk dumplings soaked in sugar syrup',
    price: 70.00,
    quantity: 5,
    image_url: '/sweetpic/image4.png',
  },
  {
    id: '14',
    name: 'Sweet Jalebi',
    category: 'syrup_sweet',
    description: 'Crispy spirals of fermented batter soaked in sugar syrup',
    price: 50.00,
    quantity: 16,
    image_url: '/sweetpic/image5.png',
  },
  {
    id: '16',
    name: 'Rasgulla',
    category: 'bengali_sweet',
    description: 'Soft and spongy cottage cheese balls in light sugar syrup',
    price: 65.00,
    quantity: 14,
    image_url: '/sweetpic/image6.png',
  },
  {
    id: '23',
    name: 'Rasmalai',
    category: 'milk_sweet',
    description: 'Soft paneer discs in creamy sweetened milk',
    price: 95.00,
    quantity: 20,
    image_url: '/sweetpic/image7.png',
  },
  {
    id: '24',
    name: 'Kheer',
    category: 'milk_sweet',
    description: 'Traditional rice pudding with milk and cardamom',
    price: 20.00,
    quantity: 11,
    image_url: '/sweetpic/image8.png',
  },
];
