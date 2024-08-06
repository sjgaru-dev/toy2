import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/reducer/authSlice';
import scheduleReducer from '@/store/reducer/scheduleSlice';
import toastReducer from '@/store/reducer/toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
