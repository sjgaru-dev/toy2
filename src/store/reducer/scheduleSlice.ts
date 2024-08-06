import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

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
  async (
    { userNo, startDate, endDate }: { userNo: string; startDate: string; endDate: string },
    { rejectWithValue }
  ) => {
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
        where('userNo', '==', userNo), // userNo 조건 추가
        where('startDate', '>=', monthStart),
        where('endDate', '<=', monthEnd)
      );

      const querySnapshot = await getDocs(monthQuery);

      if (querySnapshot.empty) {
        return rejectWithValue('해당하는 일정이 없습니다.');
      }

      // 삭제 전 가져온 문서들 확인 및 userNo 확인
      const documentsToDelete = querySnapshot.docs.filter((doc) => {
        const data = doc.data();
        console.log('Document to be deleted:', doc.id, data);
        return data.userNo === userNo; // userNo가 일치하는 문서만 선택(혹시 모르는 중복 userNo 방지)
      });

      if (documentsToDelete.length === 0) {
        return rejectWithValue('해당 사용자의 일정이 없습니다.');
      }

      // 선택된 문서 삭제
      // Promise.all로 모든 삭제 작업이 완료될 때까지 기다림
      const deletePromises = documentsToDelete.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletePromises);

      // 삭제 작업 성공하면 userNo 반환
      return userNo;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '일정을 삭제할 수 없습니다.');
    }
  }
);

export default scheduleSlice.reducer;
