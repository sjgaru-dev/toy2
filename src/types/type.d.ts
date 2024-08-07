import { Timestamp } from 'firebase/firestore';

export interface UserType {
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
}

export interface UpcomingType {
  img?: string;
  name: string;
  event: string;
  badge: {
    text: string;
    color: string;
  };
}
