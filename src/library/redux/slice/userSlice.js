import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    fetchUser: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
