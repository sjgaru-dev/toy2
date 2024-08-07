import { useCallback, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { schedulePickerColors } from '@/constants/colors';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { ScheduleModel } from '@/types/schedule';
import { formatDate, formatTimeRange, isDailySchedule } from '@/utils/dailySchedule';

// ScheduleList 컴포넌트의 props 타입 정의
interface DailyScheduleProps {
  date: string;
  schedules: ScheduleModel[];
}

// 일정 컴포넌트
const DailySchedule = ({ date, schedules }: DailyScheduleProps) => {
  const navigate = useNavigate();
  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleModel[]>([]);

  // useCallback을 사용하여 필터링 함수 메모이제이션
  const filterSchedules = useCallback(() => {
    const filtered = schedules.filter((schedule) => isDailySchedule(date, schedule));
    setFilteredSchedules(filtered);
  }, [date, schedules]);

  // 컴포넌트가 마운트 되거나 date, schedules가 변경될 때 필터링 실행
  useEffect(() => {
    filterSchedules();
  }, [filterSchedules]);

  const handleClick = (schedule: ScheduleModel) => {
    navigate(`${PATH.SCHEDULE}/${PATH.SCHEDULE_DETAIL.replace(':id', schedule.id.toString())}`);
  };

  return (
    <div css={dailyScheduleWrap}>
      <h2>{formatDate(date)}</h2>
      <div css={scheduleListStyle}>
        <h3>
          일정 <span>{filteredSchedules.length}</span>
        </h3>
        <ul css={scheduleItemsStyle}>
          {filteredSchedules.length === 0 ? (
            <li css={emptyListStyle} className='empty'>
              일정이 없습니다.
            </li>
          ) : (
            filteredSchedules.map((schedule, idx) => (
              <li
                key={`schedule-${schedule.id || idx}`}
                css={scheduleItemStyle(schedule)}
                onClick={() => handleClick(schedule)}
              >
                <h3 css={subjectStyle}>
                  <span>{schedule.subject}</span>
                  <HiChevronRight />
                </h3>
                <p>{formatTimeRange(date, schedule)}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

// 스타일
const dailyScheduleWrap = css`
  margin-top: 12px;
  padding: 1.5rem 1rem 108px;
  background-color: ${theme.colors.white};
  h2 {
    color: ${theme.colors.darkestGray};
    font-size: ${theme.fontSizes.large};
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;
const scheduleListStyle = css`
  position: relative;
  display: flex;

  justify-content: flex-start;
  align-items: center;
  font-size: ${theme.fontSizes.large};
  width: 100%;
  gap: 50px;

  & > h3 {
    width: 60px;
    display: flex;
    flex-direction: row;
    color: ${theme.colors.darkGray};
    align-self: flex-start;
    font-weight: 600;

    span {
      display: block;
      margin-left: 4px;
      color: ${theme.colors.primary};
    }
  }
`;
const scheduleItemsStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: inherit;
  gap: 1rem;
  cursor: pointer;

  &:has(.empty) {
    height: 100px;

    .empty {
      position: absolute;
      top: 50px;
      left: 48%;
      transform: translateX(-50%);
      text-align: center;
    }
  }
`;

const emptyListStyle = css`
  width: inherit;
  height: 35px;
  text-indent: 12px;
  line-height: 1.2rem;
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.normal};
  font-weight: 600;
`;

const scheduleItemStyle = (schedule: ScheduleModel) => css`
  position: relative;
  min-width: 200px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.darkestGray};
  padding-left: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${schedulePickerColors[schedule.color]};
  }

  h3 {
    color: ${theme.colors.darkestGray};
    font-weight: 600;
    line-height: 1.2rem;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  svg {
    flex-shrink: 0;
    min-width: 12px;
    min-height: 14px;
    margin-bottom: 2px;
    font-size: 20px;
    color: ${theme.colors.darkGray};
  }

  p {
    margin-top: 6px;
    line-height: 1rem;
    color: ${theme.colors.darkGray};
    font-size: ${theme.fontSizes.normal};
  }
`;

const subjectStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    display: block;
    margin-left: 0;
    color: ${theme.colors.darkestGray};
    flex-shrink: 1;
  }
`;

export default DailySchedule;
