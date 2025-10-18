import { motion } from 'framer-motion';
import type { Category } from '../../types/recipe';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  // Take only first 5 categories for the filter bar
  const displayCategories = categories.slice(0, 5);

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-orange-400 hover:bg-orange-500',
      'bg-lime-400 hover:bg-lime-500',
      'bg-yellow-400 hover:bg-yellow-500',
      'bg-orange-500 hover:bg-orange-600',
      'bg-lime-500 hover:bg-lime-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {displayCategories.map((category, index) => (
          <motion.button
            key={category.idCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectCategory(category.strCategory)}
            className={`
              px-6 py-3 rounded-lg font-semibold text-white whitespace-nowrap
              transition-all duration-300 transform hover:scale-105
              ${selectedCategory === category.strCategory 
                ? 'ring-4 ring-offset-2 ring-green-400' 
                : ''
              }
              ${getCategoryColor(index)}
            `}
          >
            {category.strCategory}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;