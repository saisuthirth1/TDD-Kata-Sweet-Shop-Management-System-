# Sweet Shop Management System

A modern web application for managing an Indian sweet shop inventory, built with React, TypeScript, and Express.js.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saisuthirth1/TDD-Kata-Sweet-Shop-Management-System-.git
cd TDD-Kata-Sweet-Shop-Management-System-
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Start the development servers:

In one terminal (for backend):
```bash
cd server
npm start
```

In another terminal (for frontend):
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Features

- View and manage Indian sweets inventory
- Search and filter sweets by category and price
- Real-time stock management
- Admin dashboard for inventory control
- Responsive design for all devices

## Usage

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


## Project Overview

Sugar Craft Quest is a modern web application for managing an Indian sweet shop inventory. The application allows users to:
- View a catalog of Indian sweets with details and stock levels
- Search and filter sweets by category and price range
- Purchase sweets with real-time stock updates
- Manage inventory through admin features (add, delete, restock)
- Track loyalty points for purchases

### Features

- **Interactive Sweet Catalog**: Beautiful cards displaying sweet details with images
- **Smart Search & Filters**: Filter by name, category, and price range
- **Real-time Stock Management**: Live updates of inventory levels
- **Admin Controls**: Add new sweets, restock, and remove items
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## Application Screenshots and Features

### Main Interface - Sweet Shop Dashboard
Our beautiful sweet shop interface showcases various Indian sweets:

🍬 **Featured Sweets:**
- Gulab Jamun (₹40) - Deep-fried milk solid dumplings in sugar syrup
- Rasgulla (₹35) - Spongy milk balls in light sugar syrup
- Kaju Katli (₹80) - Diamond-shaped cashew fudge
- Gajar Ka Halwa (₹60) - Traditional carrot pudding

**Key Features:**
- 🔍 Smart search functionality
- 📊 Category-based filtering
- 💰 Price range filters
- 📦 Real-time stock management
- 🛍️ Quick purchase options

Our beautiful sweet shop interface shows Indian sweets like Gulab Jamun (₹40.00), Rasgulla (₹35.00), Kaju Katli (₹80.00), and Gajar Ka Halwa (₹60.00). Each sweet card displays:
- Sweet name and category
- Detailed description
- Current stock level
- Price in Indian Rupees (₹)
- Buy Now button for purchases

Our main interface features:
- Beautiful sweet cards with images and descriptions
- Search functionality with real-time filtering
- Category and price range filters
- Stock information for each sweet
- Easy-to-use purchase and restock buttons

### API Documentation (Swagger UI)
**Available Endpoints:**
- `GET /api/sweets` - Retrieve all sweets
- `POST /api/sweets` - Add a new sweet
- `PUT /api/sweets/{id}` - Update sweet details
- `DELETE /api/sweets/{id}` - Remove a sweet
- `POST /api/sweets/{id}/restock` - Restock sweet quantity
- `POST /api/sweets/{id}/purchase` - Purchase sweet

**Documentation Features:**
- 📚 Interactive API testing
- 🔐 Authentication documentation
- 📋 Request/response schemas
- ❌ Error handling details

The Swagger UI provides comprehensive API documentation for:
- GET /api/sweets - List all sweets
- POST /api/sweets - Add a new sweet
- POST /api/sweets/{id}/restock - Restock sweets
- DELETE /api/sweets/{id} - Remove a sweet

Complete API documentation with:
- All available endpoints
- Request/response schemas
- Authentication details
- Interactive testing interface

### API Implementation Details

**Restock Endpoint:**
```http
POST /api/sweets/{id}/restock
Content-Type: application/json

{
  "quantity": number
}
```

**Response:**
- 200: Sweet restocked successfully
- 400: Invalid quantity
- 404: Sweet not found

The restock endpoint allows:
- Adding stock to existing sweets
- Required parameters: sweet ID and quantity
- JSON request body with quantity field
- Returns updated sweet details

Example of the restock endpoint showing:
- Endpoint parameters
- Request body structure
- Response format
- Error handling

### Example API Response

```json
{
  "id": "3",
  "name": "Kaju Katli",
  "category": "candy",
  "description": "Diamond-shaped cashew fudge",
  "price": 80,
  "quantity": 60,
  "image_url": "https://example.com/kaju-katli.jpg"
}
```

**Response Headers:**
- `Content-Type: application/json`
- `Status: 200 OK`

Sample response shows:
- Success status code (200)
- Updated sweet details including:
  - Stock quantity
  - Sweet name and category
  - Price and description
  - Image URL

The API provides:
- Detailed response information
- Status codes
- Updated sweet details
- Proper error messages when needed

### Technical Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Express.js
- **API Documentation**: Swagger UI
- **State Management**: React Hooks
- **Animations**: Framer Motion

## My AI Usage

During the development of Sugar Craft Quest, I leveraged several AI tools to enhance my development workflow and improve code quality:

### GitHub Copilot

- **Code Generation**: Used Copilot for generating boilerplate code for React components and API endpoints
- **Type Definitions**: Helped in writing TypeScript interfaces and type definitions
- **CSS Styling**: Suggested Tailwind CSS classes for responsive design
- **Error Handling**: Generated error handling patterns and validation logic


### Reflection on AI Impact

Using AI tools significantly improved my development workflow in several ways:

1. **Increased Productivity**:
   - Reduced time spent on boilerplate code
   - Quick generation of repetitive patterns
   - Faster debugging and problem-solving

2. **Code Quality**:
   - More consistent error handling
   - Better type safety with TypeScript
   - Improved code organization
   - More comprehensive documentation

3. **Learning**:
   - Exposed to best practices and patterns
   - Learned new approaches to common problems
   - Better understanding of TypeScript features

4. **Challenges**:
   - Sometimes had to modify AI-generated code for specific needs
   - Needed to verify and test generated code thoroughly
   - Had to ensure consistency across AI suggestions

The combination of GitHub Copilot and ChatGPT proved invaluable in building a robust application while maintaining high code quality and following best practices.
