import { FaMountainSun } from 'react-icons/fa6';

import theme from '@/styles/theme';
import { CompanyType, UpcomingType } from '@/types/type';

interface MockData {
  upcoming: UpcomingType[];
  company: CompanyType[];
}

export const mockData: MockData = {
  upcoming: [
    {
      img: 'https://github.com/user-attachments/assets/e3bc9f9c-f998-4035-97f7-668190d3b78e',
      name: '박예은',
      event: '생일',
      badge: {
        text: '오늘',
        color: `${theme.colors.paleGreen}`,
      },
    },
    {
      img: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Kiki&eyes=variant14',
      name: '안민지',
      event: '입사일 1주년',
      badge: {
        text: 'D-2',
        color: `${theme.colors.darkGray}`,
      },
    },
    {
      name: '김준영',
      event: '입사일 1주년',
      badge: {
        text: 'D-6',
        color: `${theme.colors.darkGray}`,
      },
    },
    {
      name: '권도현',
      event: '입사일 2주년',
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
      Icon: FaMountainSun,
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
