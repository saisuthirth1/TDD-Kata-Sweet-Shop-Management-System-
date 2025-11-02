# Sweet Shop Management System  

<img width="975" height="522" alt="image" src="https://github.com/user-attachments/assets/3cf8e275-dca9-42b4-8f9a-138542120110" />

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
- JSON Web Token (JWT) for secure authentication
- SQLite


## Project Overview

Sugar Craft is a modern web application for managing an Indian sweet shop inventory. The application allows users to:
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

<img width="975" height="498" alt="image" src="https://github.com/user-attachments/assets/fb19a0de-cf3f-4ecf-b955-617b59974486" />

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
<img width="975" height="486" alt="image" src="https://github.com/user-attachments/assets/7bce5373-85e0-4dc5-9ad1-bdc75aa3fea9" />


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
<img width="975" height="489" alt="image" src="https://github.com/user-attachments/assets/88a1feb4-d207-4b03-8eb7-062cdb547cb4" />  
<img width="975" height="467" alt="image" src="https://github.com/user-attachments/assets/cbfa307f-0716-427b-acf7-4de4449e465f" />

### Adding of New Sweet
-> Adding using frontend  

<img width="1914" height="972" alt="image" src="https://github.com/user-attachments/assets/8a2d3468-2070-49e8-a5df-268cb49f756f" />
-> Adding using backend  

<img width="975" height="493" alt="image" src="https://github.com/user-attachments/assets/9675dd8b-e1e7-47ba-9dd4-ac1c7e3d5ac7" />
<img width="975" height="489" alt="image" src="https://github.com/user-attachments/assets/164a7af2-8e96-4c17-b727-0ee2d0c63e22" />


### Deleting a Sweet  

<img width="975" height="488" alt="image" src="https://github.com/user-attachments/assets/b5678475-345d-4091-818a-4669bf23199e" />
-> Deleting through Swagger UI  

<img width="975" height="478" alt="image" src="https://github.com/user-attachments/assets/06336d7f-2e08-4d7c-9b86-0c68fa832356" />  

<img width="975" height="491" alt="image" src="https://github.com/user-attachments/assets/e86c6a50-c37f-4973-a142-d20fca50640c" />

### Filters

-> Filter using ₹ 50.00  

<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/fc481636-4b12-491e-88b2-3b81e5cac23b" />

-> Filter of Bengali sweets  

<img width="1918" height="968" alt="image" src="https://github.com/user-attachments/assets/fe76f3bd-a313-4f34-a041-a02d06d57963" />

### GET in Swagger UI  

<img width="1916" height="967" alt="image" src="https://github.com/user-attachments/assets/892decd1-e2d7-4163-87c8-9c3f1f77a741" />

<img width="1907" height="974" alt="image" src="https://github.com/user-attachments/assets/eb4daf64-a62b-4b4d-af5a-b6991f7c1e33" />

```http
[
  {
    "id": "1",
    "name": "Gulab Jamun",
    "category": "milk_sweet",
    "description": "Deep-fried milk solid dumplings soaked in sugar syrup",
    "price": 40,
    "quantity": 100,
    "image_url": "https://example.com/gulab-jamun.jpg"
  },
  {
    "id": "2",
    "name": "Rasgulla",
    "category": "bengali",
    "description": "Spongy milk balls in light sugar syrup",
    "price": 35,
    "quantity": 80,
    "image_url": "https://example.com/rasgulla.jpg"
  },
  {
    "id": "3",
    "name": "Kaju Katli",
    "category": "candy",
    "description": "Diamond-shaped cashew fudge",
    "price": 80,
    "quantity": 50,
    "image_url": "https://example.com/kaju-katli.jpg"
  },
  {
    "id": "5",
    "name": "Gulab Jamun",
    "category": "sweet",
    "description": "Soft, deep-fried milk dumplings soaked in cardamom-flavored sugar syrup. Pack of 6.",
    "price": 120,
    "quantity": 40,
    "image_url": "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1"
  }
]
```  


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
- **Authentication**: JSON Web Tokens (JWT)
- **Animations**: Framer Motion

## My AI Usage

During the development of Sugar Craft, I leveraged several AI tools to enhance my development workflow and improve code quality:

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
