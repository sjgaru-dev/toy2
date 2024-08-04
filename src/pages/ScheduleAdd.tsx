import Header from '@/components/layout/Header';
import ScheduleForm from '@/components/scheduleForm/ScheduleForm';
import { ScheduleFormDataModel } from '@/types/schedule';

const ScheduleAddPage = () => {
  const onSave = (data: ScheduleFormDataModel) => {
    console.log('save!', data);
  };

  return (
    <>
      <Header />
      <ScheduleForm onSubmit={onSave} />
    </>
  );
};

export default ScheduleAddPage;
