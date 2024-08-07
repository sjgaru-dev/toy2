import { useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/layout/Header';
import { ColorsType } from '@/components/scheduleForm/ColorPicker';
import ScheduleForm, { ALARM_OPTIONS } from '@/components/scheduleForm/ScheduleForm';
import { PATH } from '@/constants/path';
import useFetchSchedule from '@/hooks/useFetchSchedule';
import useToast from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { fetchEditSchedule } from '@/store/reducer/scheduleSlice';
import { ScheduleFormDataModel } from '@/types/schedule';
import { getScheduleData } from '@/utils/schedule';

const ScheduleEditPage = () => {
  const { schedule } = useFetchSchedule();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toastTrigger } = useToast();

  if (!schedule.length) return;

  const scheduleData = getScheduleData(schedule, id as string);
  const { subject, content, isAlarm, alarmTime, color, startDate, startTime, endDate, endTime } =
    scheduleData;

  const getAlarmOption = (alarmTime: number, isAlarm: boolean) => {
    switch (alarmTime) {
      case 0:
        return isAlarm ? ALARM_OPTIONS.ON_TIME : ALARM_OPTIONS.NONE;
      case 600:
        return ALARM_OPTIONS.TEN_MINUTES;
      case 1800:
        return ALARM_OPTIONS.THIRTY_MINUTES;
    }
  };

  const alarmOption = getAlarmOption(alarmTime, isAlarm);

  const onEdit = async (data: ScheduleFormDataModel) => {
    const newData = { ...scheduleData, ...data };

    await dispatch(fetchEditSchedule(newData)).then((state) => {
      if (state.meta.requestStatus === 'fulfilled') {
        toastTrigger('일정이 수정되었습니다.');
        navigate(PATH.SCHEDULE);
      }
    });
  };

  return (
    <>
      <Header />
      <ScheduleForm
        initTitleValue={subject}
        initContentValue={content}
        initEnableAllDay={startTime === '00:00' && endTime === '23:59'}
        initSelectedAlarmOption={alarmOption}
        initSelectedColor={color as ColorsType}
        initStartDate={new Date(startDate)}
        initEndDate={new Date(endDate)}
        initStartTime={startTime}
        initEndTime={endTime}
        submitButtonText='일정 수정하기'
        onSubmit={onEdit}
      />
    </>
  );
};

export default ScheduleEditPage;
