# Recipe Book

A feature-rich React application that allows users to discover, search, and save their favorite recipes using the Spoonacular API.

## Features

- 🔍 **Recipe Search**: Search recipes by name or ingredients
- 🏷️ **Category Filters**: Filter recipes by dietary preferences (vegetarian, vegan, gluten-free)
- 📖 **Detailed Recipe View**: View comprehensive recipe information including ingredients, instructions, and cooking time
- 👤 **User Authentication**: Register and login to access personalized features
- ❤️ **Favorites System**: Save and manage your favorite recipes
- 🎨 **Responsive Design**: Beautiful and functional across all device sizes

## Technologies Used

- React.js
- React Router for navigation
- Firebase Authentication & Firestore
- Styled Components for styling
- Spoonacular API for recipe data
- Vite as build tool
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular API key
- Firebase project credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-book.git
cd recipe-book
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your credentials:
```env
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server:
```bash
npm run dev or vite
```

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
recipe-book/
├── src/
│   ├── api/            # API integration
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── firebase.js    # Firebase configuration
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Features in Detail

### Recipe Search
- Search by recipe name or ingredients
- Real-time search results
- Category-based filtering

### Authentication
- Email/password registration and login
- Secure user sessions
- Protected routes for authenticated features

### Favorites System
- Save recipes to personal favorites
- View all favorite recipes in one place
- Remove recipes from favorites

### Recipe Details
- Comprehensive recipe information
- Ingredient lists with measurements
- Step-by-step cooking instructions
- Cooking time and servings information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for providing recipe data
- [Firebase](https://firebase.google.com/) for authentication and database services
- [React](https://reactjs.org/) and the React community for excellent documentation and resources