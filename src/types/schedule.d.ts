export interface ScheduleFormDataModel {
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

export interface ScheduleModel extends ScheduleFormDataModel {
  id: number;
  userNo: string;
  docId?: string;
}
