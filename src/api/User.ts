import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from './index';

import { LoginProps } from '../types/props';

export const getCurrentUser = () => auth.currentUser;

export const login = async ({ email, password }: LoginProps): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};
export const logout = async (): Promise<boolean> => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};
