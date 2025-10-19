import { motion } from 'framer-motion';
import type { Category } from '../../types/recipe';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-orange-400 hover:bg-orange-500',
      'bg-lime-400 hover:bg-lime-500',
      'bg-yellow-400 hover:bg-yellow-500',
      'bg-pink-400 hover:bg-pink-500',
      'bg-purple-400 hover:bg-purple-500',
      'bg-blue-400 hover:bg-blue-500',
      'bg-red-400 hover:bg-red-500',
      'bg-teal-400 hover:bg-teal-500',
      'bg-indigo-400 hover:bg-indigo-500',
      'bg-green-400 hover:bg-green-500',
      'bg-rose-400 hover:bg-rose-500',
      'bg-cyan-400 hover:bg-cyan-500',
      'bg-amber-400 hover:bg-amber-500',
      'bg-emerald-400 hover:bg-emerald-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((category, index) => (
          <motion.button
            key={category.idCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectCategory(category.strCategory)}
            className={`
              px-4 py-3 rounded-xl font-semibold text-white text-sm
              transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${selectedCategory === category.strCategory 
                ? 'ring-4 ring-offset-2 ring-green-400 shadow-xl scale-105' 
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