// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Routes without Header */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Routes with Header */}
          <Route path="/" element={<><Header /><HomePage /></>} />
          <Route path="/recipe/:id" element={<><Header /><RecipeDetailPage /></>} />
          <Route path="/favorites" element={<><Header /><FavoritesPage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;