import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addCorrection, fetchCorrectionHistory } from '@/api/payroll';
import { ApiResponse, InitState, PayrollResponseType } from '@/types/api';
import { CorrectionProps } from '@/types/payroll';

interface PayrollState extends InitState {
  correctionHistory: CorrectionProps[];
}

const initialState: PayrollState = {
  isLoading: false,
  status: 'idle',
  error: null,
  correctionHistory: [],
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
      })
      .addCase(fetchCorrectionHistoryAction.fulfilled, (state, action) => {
        state.correctionHistory = action.payload;
        state.isLoading = false;
        state.status = 'succeeded';
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

export const fetchCorrectionHistoryAction = createAsyncThunk(
  'payroll/fetchCorrectionHistory',
  async () => {
    const response = await fetchCorrectionHistory();
    return response.data;
  }
);

export default payrollSlice.reducer;
