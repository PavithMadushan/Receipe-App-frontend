import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl overflow-hidden h-64 mb-8"
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 h-full flex flex-col justify-center px-8 text-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wide mb-2">Trending Recipe</p>
          <h1 className="text-4xl font-bold mb-2">Mike's famous salad</h1>
          <p className="text-sm mb-4">By John Mike</p>
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </button>
            <button className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
      {/* Background image - you can add actual image later */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center opacity-60"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500')" }}>
      </div>
    </motion.div>
  );
};

export default HeroSection;