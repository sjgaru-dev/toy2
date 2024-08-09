import { css } from '@emotion/react';

import logoIcon from '@/assets/images/logo_icon.svg';
import DailySchedule from '@/components/dailySchedule/DailySchedule';
import CompanySchedules from '@/components/dashboard/CompanySchedules';
import PayrollNotice from '@/components/dashboard/PayrollNotice';
import UpcomingSchedules from '@/components/dashboard/UpcomingSchedules';
import useFetchSchedule from '@/hooks/useFetchSchedule';
import { mockData } from '@/mock/data';
import theme from '@/styles/theme';

const HomePage = () => {
  const { schedule } = useFetchSchedule();

  return (
    <div css={homeContainerStyle}>
      <header css={headerStyle}>
        <h1 css={titleStyle} className='wrapper'>
          <img src={logoIcon} alt='공룡 로고' />
        </h1>
      </header>
      <div css={payrollContainerStyle}>
        <PayrollNotice />
      </div>
      <div css={scheduleContainerStyle} className='wrapper'>
        <DailySchedule date={new Date().toISOString()} schedules={schedule} />
      </div>
      <div>
        <CompanySchedules companyData={mockData.company} />
      </div>
      <div>
        <UpcomingSchedules upcomingData={mockData.upcoming} />
      </div>
    </div>
  );
};

const homeContainerStyle = css`
  padding-bottom: 80px;
`;

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

const payrollContainerStyle = css`
  > div {
    margin-top: 0;
  }
`;

const scheduleContainerStyle = css`
  margin-bottom: 12px;

  > div {
    padding: 1.5rem 1rem;
    border-radius: 8px;
    margin: 0;
  }
`;

export default HomePage;
