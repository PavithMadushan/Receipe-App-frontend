import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Eye } from 'lucide-react';

interface HeroMeal {
  id: string;
  name: string;
  author: string;
  image: string;
  category: string;
}

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Sample hero meals - You can fetch these from API
  const heroMeals: HeroMeal[] = [
    {
      id: '1',
      name: "Mike's Famous Salad",
      author: "John Mike",
      image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      category: "Vegetarian"
    },
    {
      id: '2',
      name: "Spicy Arrabiata Penne",
      author: "Chef Mario",
      image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      category: "Pasta"
    },
    {
      id: '3',
      name: "Teriyaki Chicken",
      author: "Chef Yuki",
      image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      category: "Japanese"
    },
    {
      id: '4',
      name: "Beef Wellington",
      author: "Gordon Ramsay",
      image: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
      category: "British"
    },
    {
      id: '5',
      name: "Chocolate Gateau",
      author: "Mary Berry",
      image: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
      category: "Dessert"
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = heroMeals.length - 1;
      if (nextIndex >= heroMeals.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl overflow-hidden h-64 mb-8">
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      
      {/* Slideshow Content */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroMeals[currentIndex].image}')` }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-20"></div>
          
          {/* Content */}
          <div className="relative z-30 h-full flex flex-col justify-center px-8 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-wide mb-2 text-orange-300">Trending Recipe</p>
              <h1 className="text-4xl font-bold mb-2">{heroMeals[currentIndex].name}</h1>
              <p className="text-sm mb-4">By {heroMeals[currentIndex].author}</p>
              <div className="flex items-center space-x-4">
                <button className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {heroMeals.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;