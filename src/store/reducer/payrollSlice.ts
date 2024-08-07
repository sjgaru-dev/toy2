import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addCorrection } from '@/api/payroll';
import { ApiResponse, InitState, PayrollResponseType } from '@/types/api';
import { CorrectionProps } from '@/types/payroll';

const initialState: InitState = {
  isLoading: false,
  status: 'idle',
  error: null,
};

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddCorrection.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAddCorrection.fulfilled, (state) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchAddCorrection.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message || '정정신청에 실패했습니다.';
      });
  },
});

export const fetchAddCorrection = createAsyncThunk(
  'payroll/fetchAdd',
  async (data: CorrectionProps): Promise<ApiResponse<PayrollResponseType>> => {
    try {
      return await addCorrection(data);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
);

export default payrollSlice.reducer;
