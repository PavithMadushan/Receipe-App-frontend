// src/services/favoritesService.ts
import api from './api';
import { getToken, isAuthenticated } from './authService';

export interface FavoriteRecipe {
  id: number;
  mealId: string;
  title: string;
  category: string;
  thumbnail: string;
  addedAt: string;
}

export interface AddFavoriteRequest {
  mealId: string;
}

export interface FavoriteResponse {
  flag: boolean;
  message: string;
}

/**
 * Add a recipe to favorites
 * @param mealId - The ID of the meal from TheMealDB
 * @returns Response indicating success or failure
 */
export const addToFavorites = async (mealId: string): Promise<FavoriteResponse> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }

    const response = await api.post<FavoriteResponse>(
      '/favorites',
      { mealId } as AddFavoriteRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error adding to favorites:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Failed to add to favorites. Please try again later.');
  }
};

/**
 * Get all favorite recipes for the current user
 * @returns Array of favorite recipes
 */
export const getFavorites = async (): Promise<FavoriteRecipe[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }

    const response = await api.get<FavoriteRecipe[]>('/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || [];
  } catch (error: any) {
    console.error('Error fetching favorites:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Failed to fetch favorites. Please try again.');
  }
};

/**
 * Remove a recipe from favorites
 * @param favoriteId - The ID of the favorite record (not the mealId)
 * @returns Response indicating success or failure
 */
export const removeFromFavorites = async (favoriteId: number): Promise<FavoriteResponse> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('Authentication required. Please login.');
    }

    const response = await api.delete<FavoriteResponse>(
      `/favorites/${favoriteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error removing from favorites:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Failed to remove from favorites. Please try again.');
  }
};

/**
 * Check if a recipe is in the user's favorites
 * @param mealId - The ID of the meal from TheMealDB
 * @param favorites - Array of user's favorite recipes
 * @returns Boolean indicating if the recipe is favorited
 */
export const isFavorited = (mealId: string, favorites: FavoriteRecipe[]): boolean => {
  return favorites.some(fav => fav.mealId === mealId);
};

/**
 * Get the favorite ID for a recipe if it exists
 * @param mealId - The ID of the meal from TheMealDB
 * @param favorites - Array of user's favorite recipes
 * @returns The favorite ID or null if not found
 */
export const getFavoriteId = (mealId: string, favorites: FavoriteRecipe[]): number | null => {
  const favorite = favorites.find(fav => fav.mealId === mealId);
  return favorite ? favorite.id : null;
};