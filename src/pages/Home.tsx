import { css } from '@emotion/react';

import PayrollNotice from '@/components/dashboard/PayrollNotice';
import UpcomingSchedules from '@/components/dashboard/UpcomingSchedules';
import theme from '@/styles/theme';
import { UpcomingType } from '@/types/type';

const HomePage = () => (
  <>
    <header className='wrapper'>
      <h1 css={logoStyle}>Studio T Logo</h1>
    </header>
    <PayrollNotice />
    <UpcomingSchedules upcomingData={mockData} />
  </>
);

const logoStyle = css`
  padding: 1rem 0;
  font-weight: bold;
`;

const mockData: UpcomingType[] = [
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
];

export default HomePage;
