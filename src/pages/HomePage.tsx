import { useState, useEffect } from 'react';
import HeroSection from '../components/recipe/HeroSection';
import CategoryFilter from '../components/recipe/CategoryFilter';
import RecipeGrid from '../components/recipe/RecipeGrid';
import Loader from '../components/common/Loader';
import Footer from '../components/common/Footer';
import AuthPopup from '../components/auth/AuthPopup';
import { fetchCategories, fetchRecipesByCategory } from '../services/recipeService';
import type { Category, Recipe } from '../types/recipe';

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Fetch recipes when category changes
  useEffect(() => {
    const loadRecipes = async () => {
      if (!selectedCategory) return;
      
      setLoadingRecipes(true);
      try {
        const data = await fetchRecipesByCategory(selectedCategory);
        setRecipes(data);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoadingRecipes(false);
      }
    };

    loadRecipes();
  }, [selectedCategory]);

  const handleFavoriteClick = (recipe: Recipe) => {
    console.log('Favorite clicked:', recipe.strMeal);
    // Show auth popup instead of alert
    setShowAuthPopup(true);
  };

  const handleLoadMore = () => {
    console.log('Load more clicked');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section with Slideshow */}
          <HeroSection />

          {/* Category Filter */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Recipe Grid */}
          {loadingRecipes ? (
            <Loader />
          ) : (
            <>
              <RecipeGrid 
                recipes={recipes}
                onFavoriteClick={handleFavoriteClick}
              />

              {/* Load More Button */}
              {recipes.length > 0 && (
                <div className="mt-12 flex justify-center mb-8">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />

      {/* Auth Popup */}
      <AuthPopup isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)} />
    </div>
  );
};

export default HomePage;