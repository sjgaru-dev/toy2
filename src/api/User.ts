import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './index';

import { LoginProps } from '../types/props';

export const getCurrentUser = () => auth.currentUser;

export const login = async ({ email, password }: LoginProps): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
};
