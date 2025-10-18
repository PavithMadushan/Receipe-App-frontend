import React from 'react';

interface QuickStat {
  icon: string;
  label: string;
  value: string;
  change?: string;
}

interface QuickStatsProps {
  stats: QuickStat[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <h3 className="text-gray-900 text-2xl font-bold">{stat.value}</h3>
              {stat.change && (
                <p className="text-gray-500 text-xs mt-2">{stat.change}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-xl">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;