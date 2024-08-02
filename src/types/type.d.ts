import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

import { LOADING_TYPE, RESPONSE_STATUS_TYPE } from '@/constants/signIn';

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

export interface UpcomingType {
  img?: string;
  name: string;
  event: string;
  badge: {
    text: string;
    color: string;
  };
}
