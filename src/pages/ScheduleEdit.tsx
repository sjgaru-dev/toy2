import Header from '@/components/layout/Header';
import ScheduleForm from '@/components/scheduleForm/ScheduleForm';
import { ScheduleFormDataModel } from '@/types/schedule';

const ScheduleEditPage = () => {
  const onEdit = (data: ScheduleFormDataModel) => {
    console.log('edit', data);
  };

  return (
    <>
      <Header />
      <ScheduleForm onSubmit={onEdit} />
    </>
  );
};

export default ScheduleEditPage;
