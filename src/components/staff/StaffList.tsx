import React from 'react';
import StaffCard from './StaffCard';
import { type Staff } from '../../types/staff.types';

interface StaffListProps {
  staffList: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staffList, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <table className="w-full min-w-max">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-4 text-left">
              <input type="checkbox" className="w-4 h-4 rounded" />
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">Email</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Phone</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Age</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Salary</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">Timings</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;