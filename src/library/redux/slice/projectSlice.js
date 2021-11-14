import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectApi from '../../api/projectAPI';

export const fetchProjectDetails = createAsyncThunk(
  'projects/fetchProjectDetails',
  async ({ userId, projectName, environment }, thunkAPI) => {
    const response = await projectApi.fetchProjectDetails(
      { userId, projectName },
      environment
    );
    return response;
  }
);

const initialState = { currentProject: {}, loading: false };
export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: {
    [fetchProjectDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchProjectDetails.fulfilled]: (state, payload) => {
      state.currentProject = payload;
      state.loading = false;
    },
    [fetchProjectDetails.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjectDetails } = projectSlice.actions;

export default projectSlice.reducer;
