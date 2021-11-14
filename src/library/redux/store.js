import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import menuReducer from './slice/menuSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
});
