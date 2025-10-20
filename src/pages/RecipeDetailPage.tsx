import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Heart, Share2, ChefHat, ArrowLeft } from 'lucide-react';
import { fetchRecipeById } from '../services/recipeService';
import type { RecipeDetail as RecipeDetailType } from '../types/recipe';
import Loader from '../components/common/Loader';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return;
      
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  const getIngredients = () => {
    if (!recipe) return [];
    
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetailType];
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetailType];
      
      if (ingredient && typeof ingredient === 'string' && ingredient.trim()) {
        ingredients.push({
          ingredient,
          measure: (measure as string) || '',
        });
      }
    }
    return ingredients;
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    alert('Login required to add favorites!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe?.strMeal,
          text: `Check out this recipe: ${recipe?.strMeal}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Go back to home
        </button>
      </div>
    );
  }

  const ingredients = getIngredients();
  const tags = recipe.strTags?.split(',').filter(tag => tag.trim()) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Recipes</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Recipe Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleFavoriteToggle}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    size={24}
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Recipe Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock size={24} className="text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-600">Prep Time</p>
                  <p className="font-bold text-gray-900">30 min</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users size={24} className="text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600">Servings</p>
                  <p className="font-bold text-gray-900">4 people</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star size={24} className="text-yellow-500" />
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Recipe Title and Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.strMeal}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <ChefHat size={18} />
                  {recipe.strCategory}
                </span>
                <span>•</span>
                <span>{recipe.strArea} Cuisine</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-3 px-4 font-semibold transition-colors relative ${
                  activeTab === 'ingredients'
                    ? 'text-green-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Ingredients
                {activeTab === 'ingredients' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`pb-3 px-4 font-semibold transition-colors relative ${
                  activeTab === 'instructions'
                    ? 'text-green-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Instructions
                {activeTab === 'instructions' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                  />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm max-h-[600px] overflow-y-auto">
              {activeTab === 'ingredients' && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Ingredients ({ingredients.length})
                  </h3>
                  <div className="space-y-2">
                    {ingredients.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-900 font-medium">{item.ingredient}</span>
                        </div>
                        <span className="text-gray-600">{item.measure}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How to Cook</h3>
                  <div className="prose prose-sm max-w-none">
                    {recipe.strInstructions?.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-gray-700 leading-relaxed mb-4"
                        >
                          {paragraph}
                        </motion.p>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Video Link */}
            {recipe.strYoutube && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Video Tutorial</h3>
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            )}

            {/* Start Cooking Button */}
            <button className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl">
              Start Cooking
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;