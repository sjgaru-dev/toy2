import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/api';
import { UserType } from '@/types/type';

export const getUserData = async (uid: string): Promise<UserType> => {
  const fetchResult = await getDocs(query(collection(db, 'User'), where('uid', '==', uid)));
  const userData = fetchResult.docs[0].data();

  const getData: UserType = {
    name: userData.name,
    uid: userData.uid,
    userNo: userData.userNo,
    nickname: userData.nickname,
    email: userData.email,
    hireDate: userData.hireDate,
    birthday: userData.birthday,
    img: userData.img,
    phone: userData.phone,
    team: userData.team,
    position: userData.position,
  };

  return getData;
};
