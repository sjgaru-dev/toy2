import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from './index';

import { LoginProps } from '../types/props';

export const getCurrentUser = () => auth.currentUser;

export const login = async ({ email, password }: LoginProps): Promise<boolean> => {
  try {
    await setPersistence(auth, browserSessionPersistence); // 로그인정보(auth) 지속범위를 브라우저 세션으로 설정
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
