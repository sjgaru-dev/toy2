import { auth } from '@/api';
import { firebaseConfig } from '@/constants/api';

export const checkAuth = (): boolean => {
  const sessionKey = `firebase:authUser:${firebaseConfig.apiKey}:${auth.app.name}`;
  return !!sessionStorage.getItem(sessionKey);
};

export const getUID = (isLoggedIn: boolean): string | undefined =>
  isLoggedIn ? auth.currentUser?.uid : undefined;
