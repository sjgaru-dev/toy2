import { css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { HiChevronRight } from 'react-icons/hi2';

import theme from '@/styles/theme';
import { ScheduleModel } from '@/types/schedule';
dayjs.locale('ko');

// ScheduleList 컴포넌트의 props 타입 정의
interface ScheduleListProps {
  date: string;
  schedules: ScheduleModel[];
}
interface ScheduleItemProps {
  schedule: ScheduleModel;
  date: string;
  key: string;
}
// 유틸리티 함수
// date: 캘린더 컴포넌트의 activeDate(default: 오늘 날짜)
const formatDate = (date: string) => dayjs(date).format('M월 D일 (ddd)');

// 시간 포맷팅
const formatTime = (time: string) => {
  const [hour, minute] = time.split(':');
  return dayjs().hour(parseInt(hour)).minute(parseInt(minute)).format('A hh:mm');
};

// DateType 정의
type DateType = 'same' | 'start' | 'end' | 'between';

// 날짜 타입 결정 함수
const getDateType = (currentDate: string, startDate: string, endDate: string): DateType => {
  const current = dayjs(currentDate);
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (start.isSame(end, 'day')) return 'same';
  if (current.isSame(start, 'day')) return 'start';
  if (current.isSame(end, 'day')) return 'end';
  if (current.isAfter(start) && current.isBefore(end)) return 'between';
  return 'between'; // 기본값
};

// 시간 범위 문자열 생성 함수
const getTimeRangeString = (dateType: DateType, startTime: string, endTime: string): string => {
  switch (dateType) {
    case 'same':
      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    case 'start':
      return `${formatTime(startTime)} - 오후 11:59`;
    case 'end':
      return `오전 00:00 - ${formatTime(endTime)}`;
    case 'between':
      return '하루종일';
  }
};

// 메인 함수: ScheduleItem에 하루종일 또는 오후/오전시간 알려주는 함수
const formatTimeRange = (date: string, schedule: ScheduleModel) => {
  const dateType = getDateType(date, schedule.startDate, schedule.endDate);
  return getTimeRangeString(dateType, schedule.startTime, schedule.endTime);
};

// 일정 컴포넌트
const DaySchedule = ({ date, schedules }: ScheduleListProps) => (
  <div css={dayScheduleWrap}>
    <h2>{formatDate(date)}</h2>
    <ScheduleList date={date} schedules={schedules} />
  </div>
);

// isDaySchedule 함수를 dayjs를 사용하여 구현
const isDaySchedule = (date: string, schedule: ScheduleModel): boolean => {
  const checkDate = dayjs(date);
  return (
    checkDate.isSame(schedule.startDate) ||
    checkDate.isSame(schedule.endDate) ||
    (checkDate.isAfter(schedule.startDate) && checkDate.isBefore(schedule.endDate))
  );
};

// map 함수를 별도의 함수로 분리
const renderScheduleItems = (filteredSchedules: ScheduleModel[], date: string) =>
  filteredSchedules.map((item, idx: number) => (
    <ScheduleItem schedule={item} date={date} key={`schedule-${item.id || idx}`} />
  ));
// 일정 리스트
const ScheduleList = ({ date, schedules }: ScheduleListProps) => {
  const filteredSchedules = schedules.filter((schedule) => isDaySchedule(date, schedule));

  return (
    <div css={scheduleListStyle}>
      <h3>
        일정 <span>{filteredSchedules.length}</span>
      </h3>
      <ul css={scheduleItemsStyle}>
        {filteredSchedules.length === 0 ? (
          <li css={emptyListStyle}>일정이 없습니다.</li>
        ) : (
          renderScheduleItems(filteredSchedules, date)
        )}
      </ul>
    </div>
  );
};

// 일정 아이템
const ScheduleItem = ({ schedule, date }: ScheduleItemProps) => (
  <li css={scheduleItemStyle(schedule)}>
    <h3>
      {schedule.subject}
      <HiChevronRight />
    </h3>
    <p>{formatTimeRange(date, schedule)}</p>
  </li>
);

// 스타일
const dayScheduleWrap = css`
  margin: 1rem 0 100px;
  padding: 1.5rem 1rem;
  background-color: ${theme.colors.white};
  h2 {
    color: ${theme.colors.darkestGray};
    font-size: ${theme.fontSizes.normal};
    margin-bottom: 1rem;
    font-weight: 600;
  }
  span {
    color: ${theme.colors.primary};
  }
`;
const scheduleListStyle = css`
  position: relative;
  display: flex;

  justify-content: flex-start;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  width: 100%;
  gap: 50px;
  & > h3 {
    width: 60px;
    display: flex;
    flex-direction: row;
    color: ${theme.colors.darkGray};
    align-self: flex-start;
    font-weight: 600;
  }
  span {
    display: block;
    margin-left: 4px;
  }
`;
const scheduleItemsStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: inherit;
  gap: 12px;
  cursor: pointer;
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
  height: 35px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.darkestGray};
  padding-left: 12px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 35px;
    background-color: ${schedule.color};
  }
  h3 {
    color: ${theme.colors.darkestGray};
    font-weight: 600;
    line-height: 1.2rem;
    display: flex;
    align-items: center;
  }
  h3 > svg {
    width: 12px;
    stroke-width: 1.2;
    color: ${theme.colors.darkGray};
  }
  p {
    line-height: 1rem;
    color: ${theme.colors.darkGray};
    font-size: ${theme.fontSizes.small};
  }
`;
export default DaySchedule;
