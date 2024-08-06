import { createSlice } from '@reduxjs/toolkit';

import { ToastState } from '@/types/api';

const initialState: ToastState = {
  isToastOn: false,
  toastMsg: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    toastOn: (state, action) => {
      state.isToastOn = true;
      state.toastMsg = action.payload.toastMsg;
    },
    toastOff: (state) => {
      state.isToastOn = false;
    },
  },
});

export const { toastOn, toastOff } = toastSlice.actions;

export default toastSlice.reducer;
