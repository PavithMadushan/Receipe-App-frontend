import React from 'react';
import { Check, X } from 'lucide-react';
import { type AttendanceRecord, type AttendanceStatus } from '../../types/attendance.types';

interface AttendanceRowProps {
  record: AttendanceRecord;
  onStatusChange: (id: string, status: AttendanceStatus) => void;
}

const AttendanceRow: React.FC<AttendanceRowProps> = ({ record, onStatusChange }) => {
  const getStatusColor = (status: AttendanceStatus): string => {
    switch (status) {
      case 'Present':
        return 'bg-pink-300 text-gray-900';
      case 'Absent':
        return 'bg-yellow-300 text-gray-900';
      case 'Half Shift':
        return 'bg-cyan-400 text-white';
      case 'Leave':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-900';
    }
  };

  const statusOptions: AttendanceStatus[] = ['Present', 'Absent', 'Half Shift', 'Leave'];

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <input type="checkbox" className="w-4 h-4 rounded" />
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{record.staffId}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {record.staffImage ? (
            <img
              src={record.staffImage}
              alt={record.staffName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {record.staffName
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
          )}
          <span className="text-sm text-gray-900 font-medium">{record.staffName}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{record.date}</td>
      <td className="px-4 py-4 text-sm text-gray-600 hidden sm:table-cell">{record.timings}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(record.id, status)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                record.status === status
                  ? `${getStatusColor(status)} ring-2 ring-offset-1 ring-gray-400`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-1">
            <Check size={14} />
            <span className="hidden sm:inline">Confirm</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AttendanceRow;