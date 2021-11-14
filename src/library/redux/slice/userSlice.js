import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userAPI';
import { findProjectByName } from '../../util/helperMethods';

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async ({ userId, emailId, fullName, projectName, environment }, thunkAPI) => {
    const response = await userApi.fetchUserDetails(
      {
        userId,
        emailId,
        fullName,
        projectName: projectName.toUpperCase().trim(),
      },
      environment
    );
    return response;
  }
);

const initialState = {
  loading: false,
  currentUser: {},
  allUserProjects: {},
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, payload) => {
      state.userRole = payload;
    },
  },
  extraReducers: {
    [fetchUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserDetails.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.currentUser = payload.tourmeUser;
        state.allUserProjects = payload.projectsForUser;
      }
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
