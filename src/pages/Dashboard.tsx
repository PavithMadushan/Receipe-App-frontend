import React, { useState } from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import OrdersChart from '../components/dashboard/OrdersChart';
import QuickStats from '../components/dashboard/QuickStats';
import { Download } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample data for stats
  const quickStats = [
    {
      icon: '💵',
      label: 'Daily Sales',
      value: '$2k',
      change: '9 February 2024'
    },
    {
      icon: '💰',
      label: 'Monthly Revenue',
      value: '$55k',
      change: '1 Jan - 1 Feb'
    },
    {
      icon: '🪑',
      label: 'Table Occupancy',
      value: '25 Tables',
      change: '66% occupancy'
    }
  ];

  // Sample revenue chart data
  const revenueData = [
    { month: 'JAN', sales: 2000, revenue: 3000 },
    { month: 'FEB', sales: 2500, revenue: 3500 },
    { month: 'MAR', sales: 2200, revenue: 3200 },
    { month: 'APR', sales: 3000, revenue: 4000 },
    { month: 'MAY', sales: 2800, revenue: 3800 },
    { month: 'JUN', sales: 3500, revenue: 4500 },
    { month: 'JUL', sales: 3200, revenue: 4200 },
    { month: 'AUG', sales: 3800, revenue: 4800 },
    { month: 'SEP', sales: 4000, revenue: 5000 },
    { month: 'OCT', sales: 3600, revenue: 4600 },
    { month: 'NOV', sales: 3400, revenue: 4400 },
    { month: 'DEC', sales: 3900, revenue: 4900 },
  ];

  // Sample orders data
  const popularDishes = [
    {
      id: '1',
      name: 'Chicken Parmesan',
      image: 'https://via.placeholder.com/64?text=Chicken',
      serving: 'Serving: 01 person',
      price: '$55.00',
      status: 'In Stock' as const
    },
    {
      id: '2',
      name: 'Chicken Parmesan',
      image: 'https://via.placeholder.com/64?text=Chicken',
      serving: 'Serving: 01 person',
      price: '$55.00',
      status: 'In Stock' as const
    },
    {
      id: '3',
      name: 'Chicken Parmesan',
      image: 'https://via.placeholder.com/64?text=Chicken',
      serving: 'Serving: 01 person',
      price: '$55.00',
      status: 'Out of stock' as const
    },
    {
      id: '4',
      name: 'Chicken Parmesan',
      image: 'https://via.placeholder.com/64?text=Chicken',
      serving: 'Serving: 01 person',
      price: '$55.00',
      status: 'In Stock' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your restaurant overview.</p>
      </div>

      {/* Quick Stats */}
      <QuickStats stats={quickStats} />

      {/* Popular Dishes Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersChart 
          title="Popular Dishes" 
          orders={popularDishes.slice(0, 4)}
          onSeeAll={() => console.log('See all popular dishes')}
        />
        <OrdersChart 
          title="Popular Dishes" 
          orders={popularDishes.slice(0, 4)}
          onSeeAll={() => console.log('See all popular dishes')}
        />
      </div>

      {/* Revenue Chart Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 text-xl font-bold">Overview</h2>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600 text-sm">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Revenue</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
              Monthly
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
              Daily
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
              Weekly
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-pink-500 border border-pink-300 rounded-lg text-sm font-medium hover:bg-pink-50 transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <RevenueChart data={revenueData} />
      </div>
    </div>
  );
};

export default Dashboard;