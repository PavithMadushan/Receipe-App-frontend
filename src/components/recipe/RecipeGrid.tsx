import RecipeCard from './RecipeCard';
import type { Recipe } from '../../types/recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  onFavoriteClick: (recipe: Recipe) => void;
  favoriteIds?: string[];
}

const RecipeGrid = ({ recipes, onFavoriteClick, favoriteIds = [] }: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.idMeal} 
          recipe={recipe}
          onFavoriteClick={onFavoriteClick}
          isFavorite={favoriteIds.includes(recipe.idMeal)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;