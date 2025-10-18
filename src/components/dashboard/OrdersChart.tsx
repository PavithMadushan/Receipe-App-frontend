import React from 'react';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  serving: string;
  price: string;
  status: 'In Stock' | 'Out of stock';
}

interface OrdersChartProps {
  title: string;
  orders: OrderItem[];
  onSeeAll?: () => void;
}

const OrdersChart: React.FC<OrdersChartProps> = ({ title, orders, onSeeAll }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 text-xl font-bold">{title}</h2>
        <button 
          onClick={onSeeAll}
          className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
        >
          See All
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div 
            key={order.id}
            className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {/* Image */}
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
              <img 
                src={order.image} 
                alt={order.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-gray-900 font-semibold text-sm">{order.name}</h3>
              <p className="text-gray-500 text-xs">{order.serving}</p>
            </div>

            {/* Status & Price */}
            <div className="text-right">
              <p className={`text-xs font-medium mb-1 ${
                order.status === 'In Stock' 
                  ? 'text-emerald-500' 
                  : 'text-red-500'
              }`}>
                {order.status}
              </p>
              <p className="text-gray-900 font-semibold text-sm">{order.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersChart;