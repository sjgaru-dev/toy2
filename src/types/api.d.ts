import { UserCredential } from 'firebase/auth';

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AuthState {
  isLoading: boolean;
  status: status;
  error: string | null;
}

export interface ApiResponse<T> {
  status: 'idle' | 'success' | 'error';
  response: T;
}

export type AuthResponseType = UserCredential;
