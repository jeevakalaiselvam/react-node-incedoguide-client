import { createSlice } from '@reduxjs/toolkit';
import { CONFIGURE_TOUR_MENU_OPTIONS } from '../../util/configureTourUtils';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    visible: false,
    action: '',
    configureTourMenu: {
      visible: false,
      action: '',
      activeSubMenu: '',
    },
  },
  reducers: {
    setMenuVisible: (state, action) => {
      state.visible = action.payload;
    },
    setMenuAction: (state, action) => {
      state.action = action.payload;
      state.visible = false;
      state.configureTourMenu.visible = true;
    },
    setConfigureTourMenuVisible: (state, action) => {
      state.configureTourMenu.visible = action.payload;
    },
    setConfigureTourMenuAction: (state, action) => {
      state.configureTourMenu.action = action.payload;
      state.configureTourMenu.visible = false;
      switch (action.payload) {
        case CONFIGURE_TOUR_MENU_OPTIONS.ADD_TOUR.action:
          state.configureTourMenu.activeSubMenu =
            CONFIGURE_TOUR_MENU_OPTIONS.ADD_TOUR.action;
          break;
        case CONFIGURE_TOUR_MENU_OPTIONS.EDIT_TOUR.action:
          state.configureTourMenu.activeSubMenu =
            CONFIGURE_TOUR_MENU_OPTIONS.EDIT_TOUR.action;
          break;
        case CONFIGURE_TOUR_MENU_OPTIONS.REORDER_TOUR.action:
          state.configureTourMenu.activeSubMenu =
            CONFIGURE_TOUR_MENU_OPTIONS.REORDER_TOUR.action;
          break;
        case CONFIGURE_TOUR_MENU_OPTIONS.DELETE_TOUR.action:
          state.configureTourMenu.activeSubMenu =
            CONFIGURE_TOUR_MENU_OPTIONS.DELETE_TOUR.action;
          break;
        default:
          break;
      }
    },
    setConfigureTourMenuCancel: (state, action) => {
      state.configureTourMenu.visible = false;
      state.visible = true;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  setMenuVisible,
  setMenuAction,
  setConfigureTourMenuVisible,
  setConfigureTourMenuAction,
  setConfigureTourMenuConfirm,
  setConfigureTourMenuCancel,
} = menuSlice.actions;

export default menuSlice.reducer;
