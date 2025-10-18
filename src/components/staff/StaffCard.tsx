import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { type Staff } from '../../types/staff.types';

interface StaffCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <input type="checkbox" className="w-4 h-4 rounded" />
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{staff.id}</td>
      <td className="px-4 py-4 text-sm text-gray-900 font-medium">{staff.name}</td>
      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">{staff.email}</td>
      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">{staff.phone}</td>
      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">{staff.age || '-'}</td>
      <td className="px-4 py-4 text-sm text-gray-900 font-medium hidden lg:table-cell">${staff.salary.toFixed(2)}</td>
      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">{staff.timings}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(staff)}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(staff.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StaffCard;