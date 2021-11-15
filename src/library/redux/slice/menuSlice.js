import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    MENU_OPEN: (state, { payload }) => {
      state.menuOpen = payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { MENU_OPEN } = menuSlice.actions;

export default menuSlice.reducer;
