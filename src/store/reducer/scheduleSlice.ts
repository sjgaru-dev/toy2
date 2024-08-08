import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/api';
import { addSchedule, editSchedule } from '@/api/schedule';
import { status } from '@/types/api';
import { ScheduleFormDataModel, ScheduleModel } from '@/types/schedule';
import { getUID } from '@/utils/auth';

export interface ScheduleState {
  schedule: ScheduleModel[];
  status: status;
  error: string | null;
  isFetched: boolean;
  currentSchedule: ScheduleModel | null;
}

const initialState: ScheduleState = {
  schedule: [],
  status: 'idle',
  error: null,
  isFetched: false,
  currentSchedule: null,
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setFetchedFalse: (state) => {
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedule = action.payload;
        state.isFetched = true;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 가져올 수 없습니다.';
      })
      .addCase(deleteScheduleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteScheduleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isFetched = false;
        state.schedule = state.schedule = state.schedule.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteScheduleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 삭제할 수 없습니다.';
      })
      .addCase(getScheduleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSchedule = action.payload;
      })
      .addCase(getScheduleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 삭제할 수 없습니다.';
      })
      .addCase(fetchAddSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddSchedule.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isFetched = false;
      })
      .addCase(fetchAddSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 추가할 수 없습니다.';
      })
      .addCase(fetchEditSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEditSchedule.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isFetched = false;
      })
      .addCase(fetchEditSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 수정할 수 없습니다.';
      });
  },
});

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async () => {
  try {
    const scheduleRef = collection(db, 'Schedule');
    const scheduleQuery = query(scheduleRef, where('userNo', '==', await getUID()));
    const querySnapshot = await getDocs(scheduleQuery);

    const schedules: ScheduleModel[] = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          docId: doc.id,
        }) as ScheduleModel
    );

    return schedules;
  } catch (error) {
    throw new Error('일정을 가져올 수 없습니다.');
  }
});

export const deleteScheduleById = createAsyncThunk<
  number,
  { id: number; startDate: string; endDate: string },
  { rejectValue: string }
>('schedule/deleteSchedule', async ({ id, startDate, endDate }, { rejectWithValue }) => {
  try {
    // startDate의 월 추출
    const startMonth = dayjs(startDate).format('MM');
    // endDate의 월 추출
    const endMonth = dayjs(endDate).format('MM');
    const year = dayjs(startDate).format('YYYY');

    // 해당 월의 시작일과 종료일 계산
    const monthStart = dayjs(`${year}-${startMonth}-01`).startOf('month').format('YYYY-MM-DD');
    const monthEnd = dayjs(`${year}-${endMonth}-01`).endOf('month').format('YYYY-MM-DD');

    const scheduleRef = collection(db, 'Schedule');

    const monthQuery = query(
      scheduleRef,
      where('id', '==', id),
      where('startDate', '>=', monthStart),
      where('endDate', '<=', monthEnd)
    );

    const querySnapshot = await getDocs(monthQuery);

    if (querySnapshot.empty) {
      return rejectWithValue('해당하는 일정이 없습니다.');
    }

    // 해당하는 일정 첫번째 문서 삭제
    const docToDelete = querySnapshot.docs[0];
    await deleteDoc(docToDelete.ref);

    // 삭제된 일정의 id 반환
    return id;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '일정을 삭제할 수 없습니다.');
  }
});
export const getScheduleById = createAsyncThunk<ScheduleModel, number, { rejectValue: string }>(
  'schedule/getScheduleById',
  async (id, { rejectWithValue }) => {
    try {
      const scheduleRef = collection(db, 'Schedule');
      const q = query(scheduleRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return rejectWithValue('해당하는 일정이 없습니다.');
      }

      const scheduleDoc = querySnapshot.docs[0];

      const scheduleData = scheduleDoc.data() as ScheduleModel; // Cast the data to ScheduleModel
      return scheduleData;
    } catch (error) {
      return rejectWithValue('일정을 불러오는데 실패했습니다.');
    }
  }
);

export const fetchAddSchedule = createAsyncThunk(
  'schedule/fetchAddSchedule',
  async (data: ScheduleFormDataModel, { rejectWithValue }) => {
    try {
      return await addSchedule(data);
    } catch (error) {
      return rejectWithValue('일정을 추가할 수 없습니다.');
    }
  }
);

export const fetchEditSchedule = createAsyncThunk(
  'schedule/fetchEditSchedule',
  async (data: ScheduleModel, { rejectWithValue }) => {
    try {
      return await editSchedule(data);
    } catch (error) {
      return rejectWithValue('일정을 수정할 수 없습니다.');
    }
  }
);

export const { setFetchedFalse } = scheduleSlice.actions;

export default scheduleSlice.reducer;
