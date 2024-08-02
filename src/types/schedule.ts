export interface ScheduleModel {
  id: number;
  userNo: number;
  color: string;
  subject: string;
  content: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isAlarm: boolean;
  alarmTime: number;
}
