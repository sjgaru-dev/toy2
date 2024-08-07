import { addDoc, collection } from 'firebase/firestore';

import { db } from '@/api';
import { ApiResponse, ScheduleResponseType } from '@/types/api';
import { ScheduleFormDataModel, ScheduleModel } from '@/types/schedule';
import { getUID } from '@/utils/auth';

export const addSchedule = async (
  data: ScheduleFormDataModel
): Promise<ApiResponse<ScheduleResponseType>> => {
  console.log(data);

  const scheduleData: ScheduleModel = {
    ...data,
    id: 1,
    userNo: getUID(),
  };

  // const doc = await addDoc(collection(db, FIRESTORE_COLLECTION.schedule), data);
  await addDoc(collection(db, 'Schedule'), scheduleData);

  return { status: 'succeeded', response: true };
};
