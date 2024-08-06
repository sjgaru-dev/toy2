import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';

import { db } from '@/api';
import { status } from '@/types/api';
import { ScheduleModel } from '@/types/schedule';

export interface ScheduleState {
  schedule: ScheduleModel[];
  status: status;
  error: string | null;
}

const initialState: ScheduleState = {
  schedule: [],
  status: 'idle',
  error: null,
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
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 가져올 수 없습니다.';
      })
      .addCase(deleteSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schedule = state.schedule = state.schedule.filter(
          (item) => item.userNo !== action.payload
        );
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '일정을 삭제할 수 없습니다.';
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

export const deleteSchedule = createAsyncThunk(
  'schedule/deleteSchedule',
  async (userNo: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'Schedule', userNo));
      return userNo;
    } catch (error) {
      return rejectWithValue('일정을 삭제할 수 없습니다.');
    }
  }
);

export default scheduleSlice.reducer;
