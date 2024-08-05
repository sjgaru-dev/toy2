import { css } from '@emotion/react';

import logoIcon from '@/assets/images/logo_icon.svg';
import PayrollNotice from '@/components/dashboard/PayrollNotice';
import UpcomingSchedules from '@/components/dashboard/UpcomingSchedules';
import theme from '@/styles/theme';
import { UpcomingType } from '@/types/type';

const HomePage = () => (
  <>
    <header css={headerStyle}>
      <h1 css={titleStyle} className='wrapper'>
        <img src={logoIcon} alt='공룡 로고' />
      </h1>
    </header>
    <PayrollNotice />
    <UpcomingSchedules upcomingData={mockData} />
  </>
);

const headerStyle = css`
  height: 60px;
  border-bottom: 1px solid ${theme.colors.borderLightGray};
`;

const titleStyle = css`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    width: 50px;
  }
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
