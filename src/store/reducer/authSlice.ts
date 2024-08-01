/* eslint-disable @typescript-eslint/ban-types */
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { doSignIn, doSignOut } from '@/api/Auth';
import { SignInProps } from '@/types/props';
import { ApiResponse, AuthResponseType, LoadingType } from '@/types/type';

type AuthState = {
  isLoading: LoadingType;
  isAuth: boolean;
  apiResult: ApiResponse<AuthResponseType | null | SerializedError>;
};

const initialState: AuthState = {
  isLoading: 'idle',
  isAuth: false,
  apiResult: {
    status: 'idle',
    response: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = 'pending';
        state.apiResult = { status: 'idle', response: null };
      })
      .addCase(fetchSignIn.fulfilled, (state, { payload }) => {
        state.isLoading = 'fulfilled';
        state.isAuth = true;
        state.apiResult = payload;
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.isLoading = 'idle';
        state.apiResult = { status: 'error', response: action.error };
      })
      .addCase(fetchSignOut.pending, (state) => {
        state.isLoading = 'pending';
      })
      .addCase(fetchSignOut.fulfilled, (state) => {
        state.isLoading = 'fulfilled';
        state.isAuth = false;
        state.apiResult = { status: 'idle', response: null };
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
