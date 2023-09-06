import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authService';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
