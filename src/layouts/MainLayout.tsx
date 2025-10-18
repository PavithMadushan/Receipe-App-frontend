import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const MainLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        
      </div>
    </div>
  );
};

export default MainLayout;