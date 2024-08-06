import { UserCredential } from 'firebase/auth';

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AuthState {
  isLoading: boolean;
  status: status;
  error: string | null;
}

export interface ApiResponse<T> {
  status: status;
  response: T;
}

export type AuthResponseType = UserCredential;

export interface ToastState {
  isToastOn: boolean;
  toastMsg: string;
}
