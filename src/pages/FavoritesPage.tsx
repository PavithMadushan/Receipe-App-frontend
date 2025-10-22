// src/pages/FavoritesPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ChefHat } from 'lucide-react';
import { getFavorites, removeFromFavorites, FavoriteRecipe } from '../services/favoritesService';
import { isAuthenticated } from '../services/authService';
import Loader from '../components/common/Loader';
import Footer from '../components/common/Footer';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Load favorites
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();
        console.log('Loaded favorites:', data);
        setFavorites(data);
      } catch (error) {
        console.error('Failed to load favorites:', error);
        alert('Failed to load favorites. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [navigate]);

  const handleRemove = async (favoriteId: number) => {
    if (!confirm('Are you sure you want to remove this recipe from favorites?')) {
      return;
    }

    setRemovingId(favoriteId);
    
    try {
      const response = await removeFromFavorites(favoriteId);
      
      if (response.flag) {
        // Remove from local state
        setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
        alert('Removed from favorites!');
      } else {
        alert(response.message || 'Failed to remove from favorites');
      }
    } catch (error: any) {
      console.error('Error removing favorite:', error);
      alert(error.message || 'Failed to remove from favorites');
    } finally {
      setRemovingId(null);
    }
  };

  const handleViewRecipe = (mealId: string) => {
    navigate(`/recipe/${mealId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" size={32} />
              My Favorite Recipes
            </h1>
            <p className="text-gray-600 mt-2">
              {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
            </p>
          </div>

          {/* Favorites Grid */}
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
              <p className="text-gray-600 mb-6">
                Start adding recipes to your favorites to see them here!
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Browse Recipes
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Recipe Image */}
                  <div className="relative h-48 overflow-hidden group cursor-pointer">
                    <img 
                      src={favorite.thumbnail} 
                      alt={favorite.title}
                      onClick={() => handleViewRecipe(favorite.mealId)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Category Badge */}
                    {favorite.category && (
                      <div className="absolute top-3 left-3 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {favorite.category}
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(favorite.id)}
                      disabled={removingId === favorite.id}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-lg disabled:opacity-50"
                    >
                      {removingId === favorite.id ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 size={16} className="text-red-500" />
                      )}
                    </button>
                  </div>

                  {/* Recipe Info */}
                  <div className="p-4">
                    <h3 
                      onClick={() => handleViewRecipe(favorite.mealId)}
                      className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 cursor-pointer hover:text-green-500 transition-colors"
                    >
                      {favorite.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Added {new Date(favorite.addedAt).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleViewRecipe(favorite.mealId)}
                        className="text-green-500 font-semibold hover:text-green-600"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FavoritesPage;