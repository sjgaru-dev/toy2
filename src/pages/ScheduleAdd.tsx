import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import ScheduleForm from '@/components/scheduleForm/ScheduleForm';
import { PATH } from '@/constants/path';
import useToast from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { fetchAddSchedule } from '@/store/reducer/scheduleSlice';
import { ScheduleFormDataModel } from '@/types/schedule';

const ScheduleAddPage = () => {
  const navigate = useNavigate();
  const { toastTrigger } = useToast();

  const dispatch = useAppDispatch();

  const onSave = async (data: ScheduleFormDataModel) => {
    await dispatch(fetchAddSchedule(data)).then((state) => {
      if (state.meta.requestStatus === 'fulfilled') {
        toastTrigger('일정 등록에 성공했습니다.');
        navigate(PATH.SCHEDULE);
      }
    });
  };

  return (
    <>
      <Header />
      <ScheduleForm onSubmit={onSave} />
    </>
  );
};

export default ScheduleAddPage;
