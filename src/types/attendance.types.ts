export type AttendanceStatus = 'Present' | 'Absent' | 'Half Shift' | 'Leave';

export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  staffImage?: string;
  date: string;
  timings: string;
  status: AttendanceStatus;
}

export interface StaffAttendance {
  staffId: string;
  staffName: string;
  staffImage?: string;
  date: string;
  timings: string;
  statuses: AttendanceStatus[];
}