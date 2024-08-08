import { UserCredential } from 'firebase/auth';

import { SalaryType } from '@/api/payroll';

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';

// AuthState InitState로 대체 필요
export interface AuthState {
  isLoading: boolean;
  status: status;
  error: string | null;
}

export interface InitState {
  isLoading: boolean;
  status: status;
  error: string | null;
}

export interface ApiResponse<T> {
  status: status;
  response: T;
}

export type AuthResponseType = UserCredential;
export type SalaryResponseType = SalaryType[];
export type PayrollResponseType = boolean;
export type ScheduleResponseType = boolean;

export interface ToastState {
  isToastOn: boolean;
  toastMsg: string;
}
