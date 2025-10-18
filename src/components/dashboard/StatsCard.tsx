import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  date: string;
  icon: string;
  trend?: number;
  chartData?: number[];
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  date, 
  icon,
  trend,
  chartData 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <h3 className="text-gray-900 text-3xl font-bold">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mb-4">{date}</p>
      
      {chartData && (
        <div className="flex items-end gap-1.5 h-16">
          {chartData.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-emerald-400 rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsCard;