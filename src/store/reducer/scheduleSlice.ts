import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

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

export default scheduleSlice.reducer;
