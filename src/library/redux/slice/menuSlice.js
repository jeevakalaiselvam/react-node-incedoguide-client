import { createSlice } from '@reduxjs/toolkit';
import { ADD_NEW_TOUR_ACTIONS } from '../../util/addTourActions';
import { CONFIGURE_TOUR_MENU_OPTIONS } from '../../util/configureTourUtils';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    visible: false,
    action: '',
    configureTourMenu: {
      visible: false,
      action: '',
      addTour: {
        visible: true,
        currentAction: '',
        domItemSelected: '',
        steps: [],
      },
      editTour: { visible: true, currentAction: '' },
      reorderTour: { visible: true, currentAction: '' },
      deleteTour: { visible: true, currentAction: '' },
    },
  },
  reducers: {
    //Main Menu State Machine
    setMenuVisible: (state, action) => {
      state.visible = action.payload;
    },
    setMenuAction: (state, action) => {
      state.action = action.payload;
      state.visible = false;
      state.configureTourMenu.visible = true;
    },

    //Configure Tour Menu State Machine
    setConfigureTourMenuVisible: (state, action) => {
      state.configureTourMenu.visible = action.payload;
    },
    setConfigureTourMenuAction: (state, action) => {
      state.configureTourMenu.action = action.payload;
      state.configureTourMenu.visible = false;
      switch (action.payload) {
        case CONFIGURE_TOUR_MENU_OPTIONS.ADD_TOUR.action:
          state.configureTourMenu.addTour.visible = true;
          state.configureTourMenu.addTour.currentAction =
            ADD_NEW_TOUR_ACTIONS.SELECTING_DOM;
          state.configureTourMenu.editTour.visible = false;
          state.configureTourMenu.reorderTour.visible = false;
          state.configureTourMenu.deleteTour.visible = false;
          break;
        case CONFIGURE_TOUR_MENU_OPTIONS.EDIT_TOUR.action:
          state.configureTourMenu.addTour.visible = false;
          state.configureTourMenu.editTour.visible = true;
          state.configureTourMenu.reorderTour.visible = false;
          state.configureTourMenu.deleteTour.visible = false;
          break;
        case CONFIGURE_TOUR_MENU_OPTIONS.REORDER_TOUR.action:
          state.configureTourMenu.addTour.visible = false;
          state.configureTourMenu.editTour.visible = false;
          state.configureTourMenu.reorderTour.visible = true;
          state.configureTourMenu.deleteTour.visible = false;
          break;
        case CONFIGURE_TOUR_MENU_OPTIONS.DELETE_TOUR.action:
          state.configureTourMenu.addTour.visible = false;
          state.configureTourMenu.editTour.visible = false;
          state.configureTourMenu.reorderTour.visible = false;
          state.configureTourMenu.deleteTour.visible = true;
          break;
        default:
          break;
      }
    },
    setConfigureTourMenuCancel: (state, action) => {
      state.configureTourMenu.visible = false;
      state.visible = true;
    },

    //Add New Tour State Machine
    setAddNewTourAction: (state, action) => {
      state.configureTourMenu.addTour.currentAction = action.payload;
    },
    setAddNewTourCancel: (state, action) => {
      state.configureTourMenu.visible = true;
      state.configureTourMenu.addTour.visible = false;
      state.configureTourMenu.editTour.visible = false;
      state.configureTourMenu.reorderTour.visible = false;
      state.configureTourMenu.deleteTour.visible = false;
    },
    setStartingDomSelection: (state, action) => {
      state.configureTourMenu.addTour.visible = false;
    },
    setDOMItemSelected: (state, action) => {
      state.configureTourMenu.addTour.domItemSelected = action.payload;
      state.configureTourMenu.addTour.visible = true;
      state.configureTourMenu.addTour.currentAction =
        ADD_NEW_TOUR_ACTIONS.EDIT_TOUR_DETAILS;
    },
    setAddNewTourEditActionCancel: (state, action) => {
      state.configureTourMenu.addTour.visible = false;
      state.configureTourMenu.addTour.currentAction =
        ADD_NEW_TOUR_ACTIONS.SELECTING_DOM;
      state.configureTourMenu.visible = true;
    },
    setAddNewTourEditActionConfirm: (state, action) => {
      state.configureTourMenu.addTour.visible = false;
      state.configureTourMenu.addTour.steps.push({
        ...action.payload,
        domTarget: state.configureTourMenu.addTour.domItemSelected,
      });
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  setStartingDomSelection,
  setMenuVisible,
  setMenuAction,
  setConfigureTourMenuVisible,
  setConfigureTourMenuAction,
  setConfigureTourMenuConfirm,
  setConfigureTourMenuCancel,
  setAddNewTourAction,
  setAddNewTourCancel,
  setDOMItemSelected,
  setAddNewTourEditActionCancel,
  setAddNewTourEditActionConfirm,
} = menuSlice.actions;

export default menuSlice.reducer;
