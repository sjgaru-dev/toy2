import { useState } from 'react';

import { css } from '@emotion/react';

import CalendarComponent from '@/components/calendar/Calendar';
import useFetchSchedule from '@/hooks/useFetchSchedule';
import theme from '@/styles/theme';

const SchedulePage = () => {
  const { schedule, events, status, error } = useFetchSchedule();
  const [activeDate, setActiveDate] = useState(new Date());

  return (
    <>
      <h1 className='page-title'>일정</h1>
      <div className='wrapper' css={calendarWrapperStyle}>
        <CalendarComponent events={events} activeDate={activeDate} setActiveDate={setActiveDate} />
      </div>
    </>
  );
};

const calendarWrapperStyle = css`
  padding-bottom: 1rem;
  background-color: ${theme.colors.white};
`;

export default SchedulePage;
