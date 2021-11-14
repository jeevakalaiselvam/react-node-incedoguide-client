import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import menuReducer from './slice/menuSlice';
import projectReducer from './slice/projectSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    project: projectReducer,
  },
});
