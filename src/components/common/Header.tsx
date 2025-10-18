import { Link } from 'react-router-dom';

const Header = () => {
  // We'll add auth logic later
  const isLoggedIn = false; // Placeholder

  return (
    <header className="bg-white shadow-sm">
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

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-green-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className="text-gray-700 hover:text-green-500 font-medium transition-colors"
            >
              Favourite
            </Link>
            <Link 
              to="/help" 
              className="text-gray-700 hover:text-green-500 font-medium transition-colors"
            >
              Help
            </Link>
          </nav>

          {/* User Profile / Login */}
          <div className="flex items-center">
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
        </div>
      </div>
    </header>
  );
};

export default Header;