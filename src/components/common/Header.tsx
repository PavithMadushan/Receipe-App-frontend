import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = false; // Placeholder

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Cookpal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors relative ${
                isActive('/') 
                  ? 'text-green-500' 
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-green-500"></span>
              )}
            </Link>
            <Link 
              to="/favorites" 
              className={`font-medium transition-colors relative ${
                isActive('/favorites') 
                  ? 'text-green-500' 
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              Favourite
              {isActive('/favorites') && (
                <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-green-500"></span>
              )}
            </Link>
            <Link 
              to="/help" 
              className={`font-medium transition-colors relative ${
                isActive('/help') 
                  ? 'text-green-500' 
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              Help
              {isActive('/help') && (
                <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-green-500"></span>
              )}
            </Link>
          </nav>

          {/* Desktop User Profile / Login */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">U</span>
              </button>
            ) : (
              <Link 
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-green-500' 
                    : 'text-gray-700 hover:text-green-500'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/favorites"
                onClick={() => setIsMenuOpen(false)} 
                className={`font-medium transition-colors ${
                  isActive('/favorites') 
                    ? 'text-green-500' 
                    : 'text-gray-700 hover:text-green-500'
                }`}
              >
                Favourite
              </Link>
              <Link 
                to="/help"
                onClick={() => setIsMenuOpen(false)} 
                className={`font-medium transition-colors ${
                  isActive('/help') 
                    ? 'text-green-500' 
                    : 'text-gray-700 hover:text-green-500'
                }`}
              >
                Help
              </Link>
              <div className="pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-200 rounded-lg">
                    <span className="text-gray-600 font-medium">Profile</span>
                  </button>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;