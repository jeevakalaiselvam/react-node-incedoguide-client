import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectApi from '../../api/projectApi';
import userApi from '../../api/userAPI';

export const apiUpdateProjectRoles = createAsyncThunk(
  'project/updateProjectRoles',
  async ({ projectId, userId, environment, projectRoles }, thunkAPI) => {
    const response = projectApi.updateProjectRoles({
      projectId,
      userId,
      projectRoles,
      environment,
    });
    return response;
  }
);

export const apiFetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (
    {
      userId,
      emailId,
      fullName,
      projectName,
      environment,
      projectRoles,
      currentUserId,
    },
    thunkAPI
  ) => {
    const response = userApi.fetchUserDetails({
      userId,
      emailId,
      fullName,
      projectName,
      environment,
      projectRoles,
      currentUserId,
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
      state.userDetails = {
        ...payload.user,
        currentUserId: payload.currentUserId,
      };
      state.projectDetails = payload.project;
      state.loading = false;
    },
    [apiFetchUserDetails.rejected]: (state) => {
      state.loading = false;
    },
    [apiUpdateProjectRoles.pending]: (state) => {
      state.loading = true;
    },
    [apiUpdateProjectRoles.fulfilled]: (state, { payload }) => {
      state.projectDetails.projectRoles = payload.project.projectRoles;
      state.loading = true;
    },
    [apiUpdateProjectRoles.rejected]: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserRole } = userSlice.actions;

export default userSlice.reducer;
