import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from './index';

import { SignInProps } from '../types/props';
import { ApiResponse, AuthResponseType } from '@/types/type';

export const getCurrentUser = () => auth.currentUser;

export const doSignIn = async ({
  email,
  password,
}: SignInProps): Promise<ApiResponse<AuthResponseType>> => {
  await setPersistence(auth, browserSessionPersistence);

  return { status: 'success', response: await signInWithEmailAndPassword(auth, email, password) };
};

export const doSignOut = async () => ({ status: 'success', response: await signOut(auth) });
