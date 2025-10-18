import React from 'react';
import { type AttendanceRecord, type AttendanceStatus } from '../../types/attendance.types';

interface AttendanceStatsProps {
  attendance: AttendanceRecord[];
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ attendance }) => {
  const stats = {
    present: attendance.filter(a => a.status === 'Present').length,
    absent: attendance.filter(a => a.status === 'Absent').length,
    halfShift: attendance.filter(a => a.status === 'Half Shift').length,
    leave: attendance.filter(a => a.status === 'Leave').length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
        <div className="text-2xl font-bold text-pink-500">{stats.present}</div>
        <div className="text-xs text-gray-600 mt-1">Present</div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
        <div className="text-2xl font-bold text-yellow-400">{stats.absent}</div>
        <div className="text-xs text-gray-600 mt-1">Absent</div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
        <div className="text-2xl font-bold text-cyan-400">{stats.halfShift}</div>
        <div className="text-xs text-gray-600 mt-1">Half Shift</div>
      </div>
      <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
        <div className="text-2xl font-bold text-red-500">{stats.leave}</div>
        <div className="text-xs text-gray-600 mt-1">Leave</div>
      </div>
    </div>
  );
};

export default AttendanceStats;