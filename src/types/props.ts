import { UpcomingType } from '@/types/type';

export type ValidProps = {
  value: string;
  regex: RegExp;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type UpcomingProps = {
  upcomingData: UpcomingType[];
};
