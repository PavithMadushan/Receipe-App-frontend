import React from 'react';
import AttendanceRow from './AttendanceRow';
import { type AttendanceRecord, type AttendanceStatus } from '../../types/attendance.types';

interface AttendanceListProps {
  attendance: AttendanceRecord[];
  onStatusChange: (id: string, status: AttendanceStatus) => void;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ attendance, onStatusChange }) => {
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
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
              Timings
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <AttendanceRow
              key={record.id}
              record={record}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;