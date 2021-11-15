import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    actionMenuToggle: (state, { payload }) => {
      state.menuOpen = payload;
    },
    actionMainMenuSelect: (state, { payload }) => {
      state.menuOpen = false;
      state.menuSelected = payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { actionMenuToggle, actionMainMenuSelect } = menuSlice.actions;

export default menuSlice.reducer;
