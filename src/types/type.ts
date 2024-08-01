import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export type LoadingType = 'idle' | 'pending' | 'fulfilled';

export interface ApiResponse<T> {
  status: 'idle' | 'success' | 'error';
  response: T;
}

export type AuthResponseType = UserCredential | FirebaseError;

export type UserType = {
  uid: string;
  userNo: number;
  name: string;
  nickname: string;
  email: string;
  hireDate: Timestamp;
  birthday: Timestamp;
  img: string;
  phone: string;
  team: string;
  position: string;
};
