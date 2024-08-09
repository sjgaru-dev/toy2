import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/api';
import { getCollectionId } from '@/api/common';
import { FIRESTORE_COLLECTION } from '@/constants/api';
import { ApiResponse, ScheduleResponseType } from '@/types/api';
import { ScheduleFormDataModel, ScheduleModel } from '@/types/schedule';
import { getUID } from '@/utils/auth';

export const addSchedule = async (
  data: ScheduleFormDataModel
): Promise<ApiResponse<ScheduleResponseType>> => {
  const scheduleData: ScheduleModel = {
    ...data,
    id: await getCollectionId({
      collectionName: FIRESTORE_COLLECTION.schedule,
      selectValue: 'next',
    }),
    userNo: await getUID(),
  };

  await addDoc(collection(db, FIRESTORE_COLLECTION.schedule), scheduleData);

  return { status: 'succeeded', response: true };
};

export const editSchedule = async (
  newData: ScheduleModel
): Promise<ApiResponse<ScheduleResponseType>> => {
  const scheduleRef = doc(db, FIRESTORE_COLLECTION.schedule, newData.docId as string);
  await updateDoc(scheduleRef, {
    ...newData,
  });

  return { status: 'succeeded', response: true };
};
