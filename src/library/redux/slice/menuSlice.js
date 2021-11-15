import { createSlice } from '@reduxjs/toolkit';
import {
  CONFIGURE_TOURS_START,
  CONFIGURE_TOURS_DOM_SELECT,
  CONFIGURE_TOURS,
  TOUR_VISIBILITY,
  PROJECT_ADMINS,
  PROVIDE_FEEDBACK,
  TOUR_VISIBILITY_START,
  PROVIDE_FEEDBACK_START,
  PROJECT_ADMIN_START,
} from '../../constants/menuConstants';

const initialState = {
  menuOpen: true,
  menuSelected: '',
  configureToursState: '',
  tourVisibilityState: '',
  projectAdminsState: '',
  provideFeedbackState: '',
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    actionMenuToggle: (state, { payload }) => {
      state.menuOpen = payload;
    },
    actionMainMenuSelect: (state, { payload }) => {
      state.menuOpen = false;
      switch (payload) {
        case '':
          state.menuSelected = '';
          state.configureToursState = '';
          state.tourVisibilityState = '';
          state.projectAdminsState = '';
          state.provideFeedbackState = '';
          break;
        case CONFIGURE_TOURS:
          state.menuSelected = CONFIGURE_TOURS;
          state.configureToursState = CONFIGURE_TOURS_START;
          break;
        case TOUR_VISIBILITY:
          state.menuSelected = TOUR_VISIBILITY;
          state.configureToursState = TOUR_VISIBILITY_START;
          break;
        case PROJECT_ADMINS:
          state.menuSelected = PROJECT_ADMINS;
          state.configureToursState = PROJECT_ADMIN_START;
          break;
        case PROVIDE_FEEDBACK:
          state.menuSelected = PROVIDE_FEEDBACK;
          state.configureToursState = PROVIDE_FEEDBACK_START;
          break;
        default:
          break;
      }
    },
    actionConfigureToursState: (state, { payload }) => {
      switch (payload) {
        case '':
          break;
        case CONFIGURE_TOURS_START:
          state.configureToursState = CONFIGURE_TOURS_START;
          break;
        case CONFIGURE_TOURS_DOM_SELECT:
          state.configureToursState = CONFIGURE_TOURS_DOM_SELECT;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  actionMenuToggle,
  actionMainMenuSelect,
  actionConfigureToursState,
} = menuSlice.actions;

export default menuSlice.reducer;
