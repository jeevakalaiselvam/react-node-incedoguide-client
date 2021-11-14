import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userAPI';

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async ({ userId, environment }, thunkAPI) => {
    const response = await userApi.fetchUserDetails({ userId }, environment);
    return response;
  }
);

export const onboardUserAndProject = createAsyncThunk(
  'users/onboardUserAndProject',
  async (
    { userId, fullName, emailId, projectName, roleType, environment },
    thunkAPI
  ) => {
    const response = await userApi.onboardUserAndProject(
      { userId, fullName, emailId, projectName, roleType, environment },
      environment
    );
    return response;
  }
);

const initialState = {
  userDetails: {
    user: {},
    projects: {},
    userOnboarded: false,
  },
  loading: false,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, payload) => {
      state.userRole = payload;
    },
    onboardUser: (state, payload) => {
      state.userDetails.userOnboarded = payload;
    },
  },
  extraReducers: {
    [fetchUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserDetails.fulfilled]: (state, { payload }) => {
      state.userDetails.user = payload.tourmeUser;
      state.userDetails.projects = payload.projectsForUser;
      state.loading = false;
    },
    [fetchUserDetails.rejected]: (state) => {
      state.loading = false;
    },
    [onboardUserAndProject.pending]: (state) => {
      state.loading = true;
    },
    [onboardUserAndProject.fulfilled]: (state, { payload }) => {
      state.userDetails.user = payload.tourmeUser;
      state.userDetails.projects = payload.projectsForUser;
      state.loading = false;
    },
    [onboardUserAndProject.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserRole } = userSlice.actions;

export default userSlice.reducer;
