import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { doSignIn, doSignOut } from '@/api/Auth';
import { ApiResponse, AuthResponseType } from '@/types/api';
import { AuthState } from '@/types/api';
import { SignInProps } from '@/types/props';

const initialState: AuthState = {
  isLoading: false,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.error = null;
        state.uid = action.payload.response.user.uid;
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.uid = undefined;
        state.error = action.error.message || '로그인에 실패했습니다.';
      })
      .addCase(fetchSignOut.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(fetchSignOut.fulfilled, (state) => {
        state = { ...initialState, uid: undefined };
      });
  },
});

export const fetchSignIn = createAsyncThunk(
  'auth/fetchSignIn',
  async ({ email, password }: SignInProps): Promise<ApiResponse<AuthResponseType>> => {
    try {
      return await doSignIn({ email, password });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
);

export const fetchSignOut = createAsyncThunk('auth/fetchSignOut', async () => {
  try {
    return await doSignOut();
  } catch (err) {
    throw new Error(`${err}`);
  }
});

export default authSlice.reducer;
