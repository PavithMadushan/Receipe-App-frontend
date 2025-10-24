import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteClick: (recipe: Recipe) => void;
  isFavorite?: boolean;
}

const RecipeCard = ({ recipe, onFavoriteClick, isFavorite = false }: RecipeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute top-3 left-3 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {recipe.strCategory}
          </div>
        )}
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">40 min</span>
          
          <div className="flex items-center gap-2">
            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick(recipe);
              }}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg 
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </motion.button>

            {/* Comment Icon - placeholder */}
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;