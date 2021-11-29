import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectApi from '../../api/projectApi';

export const apiMarkGuideComplete = createAsyncThunk(
  'project/markGuideComplete',
  async ({ projectId, userId, selectedGuideId, environment }, thunkAPI) => {
    const response = projectApi.markGuideComplete({
      projectId,
      userId,
      selectedGuideId,
      environment,
    });
    return response;
  }
);

export const apiGetAllGuides = createAsyncThunk(
  'project/getAllGuides',
  async ({ projectId, identifier, environment }, thunkAPI) => {
    const response = projectApi.getAllGuides({
      projectId,
      identifier,
      environment,
    });
    return response;
  }
);

export const apiAddNewGuide = createAsyncThunk(
  'project/addNewGuide',
  async ({ projectId, identifier, steps, title, environment }, thunkAPI) => {
    const response = projectApi.addNewGuide({
      projectId,
      identifier,
      steps,
      title,
      environment,
    });
    return response;
  }
);

export const apiUpdateGuide = createAsyncThunk(
  'project/updateGuide',
  async ({ guide, environment }, thunkAPI) => {
    const response = projectApi.updateGuide({
      guide,
      environment,
    });
    return response;
  }
);

export const apiDeleteGuides = createAsyncThunk(
  'project/deleteGuides',
  async ({ guideIdsToDelete, projectId, environment }, thunkAPI) => {
    const response = projectApi.deleteGuides({
      guideIdsToDelete,
      projectId,
      environment,
    });
    return response;
  }
);

const initialState = {
  currentEnvironment: 'LOCAL',
  identifier: '',
  guides: [],
  completedGuides: [],
  selectedGuideId: '',
  joyrideStart: false,
  joyrideSteps: [],
  joyrideCurrentIndex: 0,
  loading: false,
  projectRoles: {},
};
export const projectSlicer = createSlice({
  name: 'project',
  initialState,
  reducers: {
    actionSetEnvironment: (state, { payload }) => {
      state.currentEnvironment = payload;
    },
    actionSetIdentifier: (state, { payload }) => {
      state.identifier = payload;
    },
    actionSetJoyrideSteps: (state, { payload }) => {
      state.selectedGuideId = payload;
      const selectedGuide = state.guides.find(
        (guide) => guide.guideId === payload
      );
      if (!selectedGuide) {
        state.joyrideSteps = [];
      } else {
        state.joyrideSteps = selectedGuide.steps;
      }
    },
    actionSetJoyrideStart: (state, { payload }) => {
      state.joyrideStart = payload;
    },
    actionSetJoyrideIndex: (state, { payload }) => {
      state.joyrideCurrentIndex = payload;
    },
  },
  extraReducers: {
    [apiAddNewGuide.pending]: (state) => {
      state.loading = true;
    },
    [apiAddNewGuide.fulfilled]: (state, { payload }) => {
      state.guides = payload.guides;
      state.loading = false;
    },
    [apiAddNewGuide.rejected]: (state) => {
      state.loading = false;
    },
    [apiGetAllGuides.pending]: (state) => {
      state.loading = true;
    },
    [apiGetAllGuides.fulfilled]: (state, { payload }) => {
      state.guides = payload.guides;
      state.loading = false;
    },
    [apiGetAllGuides.rejected]: (state) => {
      state.loading = false;
    },
    [apiMarkGuideComplete.pending]: (state) => {
      state.loading = true;
    },
    [apiMarkGuideComplete.fulfilled]: (state, { payload }) => {
      state.completedGuides = payload.completedGuides;
      state.loading = true;
    },
    [apiMarkGuideComplete.rejected]: (state) => {
      state.loading = true;
    },
    [apiUpdateGuide.pending]: (state) => {
      state.loading = true;
    },
    [apiUpdateGuide.fulfilled]: (state, { payload }) => {
      state.guides = payload.guides;
      state.loading = true;
    },
    [apiUpdateGuide.rejected]: (state) => {
      state.loading = true;
    },
    [apiDeleteGuides.pending]: (state) => {
      state.loading = true;
    },
    [apiDeleteGuides.fulfilled]: (state, { payload }) => {
      state.guides = payload.guides;
      state.loading = true;
    },
    [apiDeleteGuides.rejected]: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  actionSetEnvironment,
  actionSetIdentifier,
  actionSetJoyrideSteps,
  actionSetJoyrideStart,
} = projectSlicer.actions;

export default projectSlicer.reducer;
