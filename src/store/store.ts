import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/reducer/authSlice';
import scheduleReducer from '@/store/reducer/scheduleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
