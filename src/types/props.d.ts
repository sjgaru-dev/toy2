import { UpcomingType } from '@/types/type';

export interface ValidProps {
  value: string;
  regex: RegExp;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface UpcomingProps {
  upcomingData: UpcomingType[];
}
