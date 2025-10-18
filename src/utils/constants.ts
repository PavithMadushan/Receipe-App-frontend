// API URLs
export const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// API Endpoints
export const API_ENDPOINTS = {
  categories: `${MEAL_DB_BASE_URL}/categories.php`,
  filterByCategory: (category: string) => `${MEAL_DB_BASE_URL}/filter.php?c=${category}`,
  recipeById: (id: string) => `${MEAL_DB_BASE_URL}/lookup.php?i=${id}`,
  search: (query: string) => `${MEAL_DB_BASE_URL}/search.php?s=${query}`,
};

// Your backend API URL (update this when backend is ready)
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api';

// Local Storage Keys
export const STORAGE_KEYS = {
  token: 'auth_token',
  user: 'user_data',
};

// Route Paths
export const ROUTES = {
  home: '/',
  login: '/login',
  favorites: '/favorites',
  recipeDetail: '/recipe/:id',
};