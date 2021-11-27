import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userAPI';

export const apiFetchUserDetails = createAsyncThunk(
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

const initialState = {
  projectDetails: {
    projectId: '',
    userId: '',
    emailId: '',
    fullName: '',
  },
  userDetails: {
    userId: '',
    projectId: '',
    projectName: '',
    userRole: '',
  },
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [apiFetchUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [apiFetchUserDetails.fulfilled]: (state, { payload }) => {
      state.userDetails = payload.user;
      state.projectDetails = payload.project;
      state.loading = false;
    },
    [apiFetchUserDetails.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserRole } = userSlice.actions;

export default userSlice.reducer;
