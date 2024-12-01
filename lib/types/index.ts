export type UserRole = 'APP_ADMIN' | 'SACCO_ADMIN' | 'SACCO_AGENT' | 'SACCO_USER';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  saccoId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sacco {
  id: string;
  name: string;
  description: string;
  logo?: string;
  address: string;
  phoneNumber: string;
  email: string;
  registrationNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  saccoId: string;
  type: 'SAVINGS' | 'WITHDRAWAL' | 'LOAN' | 'LOAN_REPAYMENT';
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  saccoId: string;
  amount: number;
  interestRate: number;
  duration: number; // in months
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  approvedBy?: string;
  approvedAt?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}