import dayjs from 'dayjs';

export const formatTimeString = (time: number) => (time < 10 ? '0' + time : String(time));

export const formatTo12HourTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).format('A hh:mm');
};
