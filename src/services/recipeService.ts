import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import type { Category, Recipe, RecipeDetail } from '../types/recipe';

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.categories);
    return response.data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch recipes by category
export const fetchRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.filterByCategory(category));
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
};

// Fetch recipe details by ID
export const fetchRecipeById = async (id: string): Promise<RecipeDetail | null> => {
  try {
    const response = await axios.get(API_ENDPOINTS.recipeById(id));
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

// Search recipes
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.search(query));
    return response.data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};