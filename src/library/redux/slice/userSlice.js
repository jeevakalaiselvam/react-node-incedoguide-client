import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userAPI';

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async ({ userId, environment }, thunkAPI) => {
    const response = await userApi.fetchUserById({ userId }, environment);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: { userDetails: {}, loading: false },
  reducers: {},
  extraReducers: {
    [fetchUserById.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.userDetails = payload;
      state.loading = false;
    },
    [fetchUserById.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
