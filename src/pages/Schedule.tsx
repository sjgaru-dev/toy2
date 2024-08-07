import { useState } from 'react';

import { css } from '@emotion/react';
import { HiPlus } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import CalendarComponent from '@/components/calendar/Calendar';
import DailySchedule from '@/components/dailySchedule/DailySchedule';
import { PATH } from '@/constants/path';
import useFetchSchedule from '@/hooks/useFetchSchedule';
import theme from '@/styles/theme';

const SchedulePage = () => {
  const { schedule, events, status, error } = useFetchSchedule();
  const [activeDate, setActiveDate] = useState(new Date());
  const navigate = useNavigate();

  const onAddEvent = () => navigate(`${PATH.SCHEDULE}/${PATH.SCHEDULE_ADD}`);

  return (
    <>
      <h1 className='page-title'>일정</h1>
      <div className='wrapper' css={calendarWrapperStyle}>
        <CalendarComponent events={events} activeDate={activeDate} setActiveDate={setActiveDate} />
      </div>
      <div>
        <DailySchedule date={activeDate.toISOString()} schedules={schedule} />
      </div>
      <div css={addButtonContainerStyle}>
        <button onClick={onAddEvent}>
          <HiPlus />
        </button>
      </div>
    </>
  );
};

const calendarWrapperStyle = css`
  padding-bottom: 1rem;
  background-color: ${theme.colors.white};
`;

const addButtonContainerStyle = css`
  position: fixed;
  left: 50%;
  bottom: 96px;
  width: 100vw;
  max-width: 500px;
  height: 1px;
  transform: translateX(-50%);

  button {
    position: absolute;
    bottom: 0;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: ${theme.colors.white};
    font-size: 28px;
    background-color: ${theme.colors.primary};
  }
`;

export default SchedulePage;
