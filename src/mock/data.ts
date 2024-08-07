import theme from '@/styles/theme';
import { CompanyType, UpcomingType } from '@/types/type';

interface MockData {
  upcoming: UpcomingType[];
  company: CompanyType[];
}

export const mockData: MockData = {
  upcoming: [
    {
      img: 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4c5.svg',
      name: '김태화',
      event: '생일',
      badge: {
        text: '오늘',
        color: `${theme.colors.paleGreen}`,
      },
    },
    {
      name: '이직원',
      event: '입사일 1주년',
      badge: {
        text: 'D-2',
        color: `${theme.colors.darkGray}`,
      },
    },
    {
      name: '저직원',
      event: '입사일 1주년',
      badge: {
        text: 'D-6',
        color: `${theme.colors.darkGray}`,
      },
    },
    {
      name: '그직원',
      event: '입사일 1주년',
      badge: {
        text: 'D-7',
        color: `${theme.colors.darkGray}`,
      },
    },
  ],
  company: [
    {
      name: '신입사원 워크샵',
      date: '2024-08-09 ~ 2024-08-10',
      badge: {
        text: '오늘',
        color: `${theme.colors.paleGreen}`,
      },
    },
    {
      name: '임직원 설악산 등산',
      date: '2024-08-10',
      badge: {
        text: 'D-1',
        color: `${theme.colors.darkGray}`,
      },
    },
    {
      name: '창립기념일',
      date: '2024-08-28',
      badge: {
        text: 'D-19',
        color: `${theme.colors.darkGray}`,
      },
    },
    {
      name: '창립기념 워크샵',
      date: '2024-08-30 ~ 2024-09-01',
      badge: {
        text: 'D-21',
        color: `${theme.colors.darkGray}`,
      },
    },
  ],
};
