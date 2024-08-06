import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query } from 'firebase/firestore';

import { db } from '@/api';
import { status } from '@/types/api';
import { ScheduleModel } from '@/types/schedule';

export interface ScheduleState {
  schedule: ScheduleModel[];
  status: status;
  error: string | null;
  isFetched: boolean;
}

const initialState: ScheduleState = {
  schedule: [],
  status: 'idle',
  error: null,
  isFetched: false,
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
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
      });
  },
});

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async () => {
  try {
    const scheduleRef = collection(db, 'Schedule');
    const scheduleQuery = query(scheduleRef); // 나중에 where 쿼리 추가를 위한 코드
    const querySnapshot = await getDocs(scheduleQuery);

    const schedules: ScheduleModel[] = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
        }) as ScheduleModel
    );

    return schedules;
  } catch (error) {
    throw new Error('일정을 가져올 수 없습니다.');
  }
});

export default scheduleSlice.reducer;
