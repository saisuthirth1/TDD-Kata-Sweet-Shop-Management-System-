const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mock database
let sweets = require('./data/indianSweets');

// API Routes

// GET /api/sweets - Get all sweets
app.get('/api/sweets', (req, res) => {
  res.json(sweets);
});

// GET /api/sweets/search - Search sweets
app.get('/api/sweets/search', (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let filtered = [...sweets];

  if (name) {
    filtered = filtered.filter(sweet => 
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(sweet => 
      sweet.category === category
    );
  }

  if (minPrice) {
    filtered = filtered.filter(sweet => 
      sweet.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filtered = filtered.filter(sweet => 
      sweet.price <= Number(maxPrice)
    );
  }

  res.json(filtered);
});

// POST /api/sweets - Add a new sweet
app.post('/api/sweets', (req, res) => {
  const newSweet = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body
  };

  if (!newSweet.name || !newSweet.category || !newSweet.price || !newSweet.quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  sweets.push(newSweet);
  res.status(201).json(newSweet);
});

// PUT /api/sweets/:id - Update a sweet
app.put('/api/sweets/:id', (req, res) => {
  const { id } = req.params;
  const sweetIndex = sweets.findIndex(s => s.id === id);

  if (sweetIndex === -1) {
    return res.status(404).json({ message: 'Sweet not found' });
  }

  sweets[sweetIndex] = { ...sweets[sweetIndex], ...req.body };
  res.json(sweets[sweetIndex]);
});

// DELETE /api/sweets/:id - Delete a sweet
app.delete('/api/sweets/:id', (req, res) => {
  const { id } = req.params;
  const sweetIndex = sweets.findIndex(s => s.id === id);

  if (sweetIndex === -1) {
    return res.status(404).json({ message: 'Sweet not found' });
  }

  sweets = sweets.filter(s => s.id !== id);
  res.json({ message: 'Sweet deleted successfully' });
});

// POST /api/sweets/:id/purchase - Purchase a sweet
app.post('/api/sweets/:id/purchase', (req, res) => {
  const { id } = req.params;
  const { quantity = 1 } = req.body;
  
  // Find the sweet
  const sweetIndex = sweets.findIndex(s => s.id === id);
  if (sweetIndex === -1) {
    return res.status(404).json({ message: 'Sweet not found' });
  }

  // Check stock
  const sweet = sweets[sweetIndex];
  if (sweet.quantity < quantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  // Update stock
  sweet.quantity = Math.max(0, sweet.quantity - quantity);
  sweets[sweetIndex] = sweet;

  // Return updated sweet
  res.json(sweet);
});

// POST /api/sweets/:id/restock - Restock a sweet
app.post('/api/sweets/:id/restock', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Validate input
  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ 
      message: 'Invalid quantity. Please provide a positive number.' 
    });
  }

  // Find the sweet
  const sweetIndex = sweets.findIndex(s => s.id === id);
  if (sweetIndex === -1) {
    return res.status(404).json({ message: 'Sweet not found' });
  }

  // Update stock
  const updatedSweet = {
    ...sweets[sweetIndex],
    quantity: sweets[sweetIndex].quantity + quantity
  };
  sweets[sweetIndex] = updatedSweet;

  // Return updated sweet
  res.json(updatedSweet);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});