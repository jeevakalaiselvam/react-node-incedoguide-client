import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuVisible: false,
  },
  reducers: {
    setMenuVisible: (state, action) => {
      state.menuVisible = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { setMenuVisible } = menuSlice.actions;

export default menuSlice.reducer;
