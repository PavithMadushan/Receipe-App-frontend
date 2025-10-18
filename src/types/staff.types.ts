export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  age?: number;
  salary: number;
  timings: string;
  role: string;
  dateOfBirth?: string;
  address?: string;
  shiftStartTime?: string;
  shiftEndTime?: string;
  additionalDetails?: string;
  image?: string;
  status?: 'active' | 'inactive';
}

export interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: string;
  dateOfBirth: string;
  shiftStartTime: string;
  shiftEndTime: string;
  address: string;
  additionalDetails: string;
  image?: File;
}