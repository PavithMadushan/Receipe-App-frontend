import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import StaffList from '../components/staff/StaffList';
import AddStaffModal from '../components/staff/AddStaffModal';
import EditStaffModal from '../components/staff/EditStaffModal';
import AttendanceList from '../components/attendance/AttendanceList';
import AttendanceStats from '../components/attendance/AttendanceStats';
import { type Staff, type StaffFormData } from '../types/staff.types';
import { type AttendanceRecord, type AttendanceStatus } from '../types/attendance.types';

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: '#101',
      name: 'Watson Joyce',
      email: 'waterspyell@gmail.com',
      phone: '+1 (323) 323-4654',
      age: 32,
      salary: 5200,
      timings: '9am-to-5pm',
      role: 'Manager',
      dateOfBirth: '15-Jan-1993',
      address: 'House # 34 Street 123 USA, Chicago',
      shiftStartTime: '09:00',
      shiftEndTime: '17:00',
    },
    {
      id: '#102',
      name: 'Watson Joyce',
      email: 'waterspyell@gmail.com',
      phone: '+1 (323) 323-4654',
      age: 32,
      salary: 5200,
      timings: '9am-to-5pm',
      role: 'Chef',
      dateOfBirth: '15-Jan-1993',
      address: 'House # 34 Street 123 USA, Chicago',
      shiftStartTime: '09:00',
      shiftEndTime: '17:00',
    },
    {
      id: '#103',
      name: 'Watson Joyce',
      email: 'waterspyell@gmail.com',
      phone: '+1 (323) 323-4654',
      age: 40,
      salary: 5200,
      timings: '9am-to-5pm',
      role: 'Waiter',
      dateOfBirth: '15-Jan-1993',
      address: 'House # 34 Street 123 USA, Chicago',
      shiftStartTime: '09:00',
      shiftEndTime: '17:00',
    },
    {
      id: '#104',
      name: 'Watson Joyce',
      email: 'waterspyell@gmail.com',
      phone: '+1 (323) 323-4654',
      age: 40,
      salary: 5200,
      timings: '9am-to-5pm',
      role: 'Manager',
      dateOfBirth: '15-Jan-1993',
      address: 'House # 34 Street 123 USA, Chicago',
      shiftStartTime: '09:00',
      shiftEndTime: '17:00',
    },
  ]);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    {
      id: 'a1',
      staffId: '#101',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Present',
    },
    {
      id: 'a2',
      staffId: '#102',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Present',
    },
    {
      id: 'a3',
      staffId: '#103',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Leave',
    },
    {
      id: 'a4',
      staffId: '#104',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Present',
    },
    {
      id: 'a5',
      staffId: '#101',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Absent',
    },
    {
      id: 'a6',
      staffId: '#102',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Half Shift',
    },
    {
      id: 'a7',
      staffId: '#103',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Present',
    },
    {
      id: 'a8',
      staffId: '#104',
      staffName: 'Watson Joyce',
      date: '16-Apr-2024',
      timings: '9am to 5pm',
      status: 'Leave',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [activeTab, setActiveTab] = useState<'staff' | 'attendance'>('staff');

  const handleAddStaff = (data: StaffFormData) => {
    const newStaff: Staff = {
      id: `#${staffList.length + 101}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      salary: parseFloat(data.salary),
      timings: `${data.shiftStartTime}-to-${data.shiftEndTime}`,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      shiftStartTime: data.shiftStartTime,
      shiftEndTime: data.shiftEndTime,
      additionalDetails: data.additionalDetails,
    };
    setStaffList([...staffList, newStaff]);
    setIsAddModalOpen(false);
  };

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleUpdateStaff = (id: string, data: StaffFormData) => {
    setStaffList(
      staffList.map(staff =>
        staff.id === id
          ? {
              ...staff,
              name: data.name,
              email: data.email,
              phone: data.phone,
              role: data.role,
              salary: parseFloat(data.salary),
              timings: `${data.shiftStartTime}-to-${data.shiftEndTime}`,
              dateOfBirth: data.dateOfBirth,
              address: data.address,
              shiftStartTime: data.shiftStartTime,
              shiftEndTime: data.shiftEndTime,
              additionalDetails: data.additionalDetails,
            }
          : staff
      )
    );
    setIsEditModalOpen(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (id: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffList(staffList.filter(staff => staff.id !== id));
    }
  };

  const handleAttendanceStatusChange = (id: string, status: AttendanceStatus) => {
    setAttendance(
      attendance.map(record =>
        record.id === id ? { ...record, status } : record
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Staff Management</h1>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-4 bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              activeTab === 'staff'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Staff Management
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              activeTab === 'attendance'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Attendance
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {activeTab === 'staff' && (
            <>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm"
              >
                <Plus size={18} />
                Add Staff
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <span>Sort by</span>
                <ChevronDown size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Staff Count / Section Title */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">
          {activeTab === 'staff' ? `Staff (${staffList.length})` : `Attendance Records (${attendance.length})`}
        </span>
      </div>

      {/* Staff List Table */}
      {activeTab === 'staff' && (
        <StaffList
          staffList={staffList}
          onEdit={handleEditStaff}
          onDelete={handleDeleteStaff}
        />
      )}

      {/* Attendance Tab Content */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <AttendanceStats attendance={attendance} />
          <AttendanceList
            attendance={attendance}
            onStatusChange={handleAttendanceStatusChange}
          />
        </div>
      )}

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddStaff}
      />

      {/* Edit Staff Modal */}
      <EditStaffModal
        isOpen={isEditModalOpen}
        staff={selectedStaff}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStaff(null);
        }}
        onSubmit={handleUpdateStaff}
      />
    </div>
  );
};

export default StaffManagement;