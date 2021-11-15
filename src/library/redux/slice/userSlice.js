import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async ({ userId, emailId, fullName, projectName, environment }, thunkAPI) => {
    const response = userApi.fetchUserDetails({
      userId,
      emailId,
      fullName,
      projectName,
      environment,
    });
    return response;
  }
);

const initialState = {};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserDetails.fulfilled]: (state, { payload }) => {
      state.userDetails = payload.user;
      state.projectDetails = payload.project;
      state.loading = false;
    },
    [fetchUserDetails.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserRole } = userSlice.actions;

export default userSlice.reducer;
