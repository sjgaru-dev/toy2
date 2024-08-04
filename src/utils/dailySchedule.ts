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

// isDailySchedule 함수를 dayjs를 사용하여 구현
const isDailySchedule = (date: string, schedule: ScheduleModel): boolean => {
  const checkDate = dayjs(date);
  return (
    checkDate.isSame(schedule.startDate) ||
    checkDate.isSame(schedule.endDate) ||
    (checkDate.isAfter(schedule.startDate) && checkDate.isBefore(schedule.endDate))
  );
};

export { formatDate, formatTime, formatTimeRange, isDailySchedule };
