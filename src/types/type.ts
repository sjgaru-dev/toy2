import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

export type LoadingType = 'idle' | 'pending' | 'fulfilled';

export interface ApiResponse<T> {
  status: 'idle' | 'success' | 'error';
  response: T;
}

export type AuthResponseType = UserCredential | FirebaseError;
