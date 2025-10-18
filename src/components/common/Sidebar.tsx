import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  Calendar, 
  ShoppingCart, 
  Package, 
  TableProperties,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const [activeItem, setActiveItem] = React.useState('Dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Staff Management', icon: Users, path: '/staff' },
    { name: 'Menu', icon: UtensilsCrossed, path: '/menu' },
    { name: 'Reservation', icon: Calendar, path: '/reservation' },
    { name: 'Orders', icon: ShoppingCart, path: '/orders' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Orders/Tables', icon: TableProperties, path: '/tables' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  const handleNavigation = (item: { name: string; path: string }) => {
    setActiveItem(item.name);
    navigate(item.path); // ✅ Navigate to the route
  };

  return (
    <div 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-purple-900 to-purple-800 text-white h-screen transition-all duration-300 ease-in-out flex flex-col relative`}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between border-b border-purple-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <UtensilsCrossed size={20} />
            </div>
            <span className="font-bold text-lg">RestaurantPOS</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mx-auto">
            <UtensilsCrossed size={20} />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item)}
                  
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-pink-500 text-white shadow-lg' 
                      : 'text-purple-200 hover:bg-purple-700 hover:text-white'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-pink-500 text-white rounded-full p-1.5 shadow-lg hover:bg-pink-600 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Bottom Section */}
      <div className="p-4 border-t border-purple-700">
        <button 
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-purple-200 hover:bg-purple-700 hover:text-white transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings size={20} />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;