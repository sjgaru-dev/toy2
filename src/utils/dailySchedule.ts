import dayjs from 'dayjs';

import 'dayjs/locale/ko';
import { ScheduleModel } from '@/types/schedule';

dayjs.locale('ko');

// date: 캘린더 컴포넌트의 activeDate(default: 오늘 날짜)
const formatDate = (date: string) => dayjs(date).format('M월 D일 (ddd)');

// 시간 포맷팅
const formatTime = (time: string) => {
  const [hour, minute] = time.split(':');
  return dayjs().hour(parseInt(hour)).minute(parseInt(minute)).format('A hh:mm');
};

// 날짜 포맷팅

export const convertDateWithFormat = (date: Date, format: string = 'YYYY-MM-DD'): string =>
  dayjs(date).format(format);

const formatOnlyDate = (date: string) => dayjs(date).format('M월 D일');

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
      return '하루 종일';
  }
};

// 메인 함수: ScheduleItem에 하루종일 또는 오후/오전시간 알려주는 함수
const formatTimeRange = (date: string, schedule: ScheduleModel) => {
  let dateType = getDateType(date, schedule.startDate, schedule.endDate);

  if (schedule.startTime === '00:00' && schedule.endTime === '23:59') {
    dateType = 'between';
  }

  return getTimeRangeString(dateType, schedule.startTime, schedule.endTime);
};

// 1. 모든 날짜를 일(day) 단위로 비교 => 시간차이로 인한 오류를 방지하기 위해 startOf('day') 사용
// dayjs().startOf('day') => 오늘 날짜 00:00:00
// dayjs().endOf('day') => 오늘 날짜 23:59:59
// 2. 당일 일정(시작날짜와 종료날짜가 같은 경우)인지 여부를 판단하는 함수
// 3. 여러 날에 걸친 일정의 경우, 시작일, 종료일, 그 사이 날짜에 대한 판단을 추가
const isDailySchedule = (date: string, schedule: ScheduleModel): boolean => {
  const checkDate = dayjs(date).startOf('day');
  const startDate = dayjs(schedule.startDate).startOf('day');
  const endDate = dayjs(schedule.endDate).startOf('day');

  // 체크 날짜가 시작일 또는 종료일과 같은 경우(당일 일정인 경우)
  if (checkDate.isSame(startDate, 'day') || checkDate.isSame(endDate, 'day')) {
    return true;
  }

  // 여러 날에 걸친 일정의 경우, 시작일과 종료일 사이에 있는지 여부를 판단
  return checkDate.isAfter(startDate) && checkDate.isBefore(endDate);
};

export { formatDate, formatOnlyDate, formatTime, formatTimeRange, isDailySchedule };
