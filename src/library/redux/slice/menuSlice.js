import { createSlice } from '@reduxjs/toolkit';
import {
  CG_OPTION_NEW,
  CG_OPTION_ADD_STEP,
  CG_OPTION_EDIT_STEP,
  CG_OPTION_REORDER_STEP,
  CG_OPTION_DELETE_GUIDE,
} from '../../menuconstants/configureGuide';
import {
  CG_NEW_ADD_DETAILS,
  CG_NEW_CONFIRM_STEP,
  CG_NEW_DOM_SELECT,
  CG_NEW_START,
} from '../../menuconstants/CG_New';
import {
  MENU_TOGGLE_CLOSE,
  MENU_TOGGLE_OPEN,
} from '../../menuconstants/mainMenu';
import {
  MENU_OPTION_CONFIGURE_GUIDES,
  MENU_OPTION_SETUP_VISIBILITY,
  MENU_OPTION_SETUP_ROLES,
} from '../../menuconstants/menuOptions';
import {
  CG_EDIT_STEP_EDIT_CONFIRM,
  CG_EDIT_STEP_EDIT_DETAILS,
  CG_EDIT_STEP_START,
} from '../../menuconstants/CG_EditStep';
import {
  CG_ADD_STEP_ADD_DETAILS,
  CG_ADD_STEP_CONFIRM_STEPS,
  CG_ADD_STEP_DOM_SELECT,
  CG_ADD_STEP_INSERTION_POINT,
  CG_ADD_STEP_PROMPT,
  CG_ADD_STEP_START,
} from '../../menuconstants/CG_AddStep';
import {
  CG_DELETE_GUIDE_CONFIRM,
  CG_DELETE_GUIDE_START,
} from '../../menuconstants/CG_DeleteGuide';
import {
  SR_SETUP_CONFIRM,
  SR_SETUP_START,
} from '../../menuconstants/setupRoles';
import {
  GV_SETUP_CONFIRM,
  GV_SETUP_START,
} from '../../menuconstants/guideVisibility';
import {
  CG_REORDER_STEP_CHANGE_ORDER,
  CG_REORDER_STEP_CONFIRM,
  CG_REORDER_STEP_START,
} from '../../menuconstants/CG_ReorderStep';

const initialState = {
  menuToggle: '',
  menuOption: '',
  configureGuidesOption: '',
  setupRolesOption: '',
  configureGuidesNewState: {
    currentAction: '',
    steps: [],
    guideTitle: '',
    currentDomTarget: '',
    oldGuide: {},
    roleVisibilityList: [],
  },
  configureGuidesAddStepsState: {
    currentAction: '',
    steps: [],
    guideTitle: '',
    currentDomTarget: '',
    selectedGuideId: '',
    insertionIndex: '',
    oldGuide: {},
  },
  configureGuidesEditStepsState: {
    currentAction: '',
    steps: [],
    guideTitle: '',
    selectedGuideId: '',
    oldGuide: {},
  },
  configureGuidesReorderStepsState: {
    currentAction: '',
    steps: [],
    guideTitle: '',
    selectedGuideId: '',
    oldGuide: {},
  },
  configureGuidesDeleteGuidesState: {
    currentAction: '',
    oldGuides: [],
    guideIdsToDelete: [],
  },
  setupRolesState: {
    currentAction: '',
    oldRoles: {},
    newRoles: {},
  },
  guideVisibility: {
    currentAction: '',
  },
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    actionMenuToggle: (state, { type, payload }) => {
      switch (payload) {
        case '':
          state.menuToggle = '';
          break;
        case MENU_TOGGLE_OPEN:
          state.menuToggle = MENU_TOGGLE_OPEN;
          break;
        case MENU_TOGGLE_CLOSE:
          state.menuToggle = MENU_TOGGLE_CLOSE;
          break;
        default:
          break;
      }
    },
    actionMenuOption: (state, { payload }) => {
      switch (payload) {
        case '':
          state.menuOption = '';
          break;
        case MENU_OPTION_CONFIGURE_GUIDES:
          state.menuOption = MENU_OPTION_CONFIGURE_GUIDES;
          break;
        case MENU_OPTION_SETUP_ROLES:
          state.menuOption = MENU_OPTION_SETUP_ROLES;
          state.setupRolesState.currentAction = SR_SETUP_START;
          break;
        case MENU_OPTION_SETUP_VISIBILITY:
          state.menuOption = MENU_OPTION_SETUP_VISIBILITY;
          state.guideVisibility.currentAction = GV_SETUP_START;
          break;
        default:
          break;
      }
    },
    //Configure Guide Option Dropdown
    actionConfigureGuidesOption: (state, { payload: { action, data } }) => {
      switch (action) {
        case '':
          state.configureGuidesOption = '';
          break;
        case CG_OPTION_NEW:
          state.configureGuidesOption = CG_OPTION_NEW;
          state.configureGuidesNewState.currentAction = CG_NEW_START;
          break;
        case CG_OPTION_ADD_STEP:
          state.configureGuidesOption = CG_OPTION_ADD_STEP;
          state.configureGuidesAddStepsState.currentAction = CG_ADD_STEP_START;
          break;
        case CG_OPTION_EDIT_STEP:
          state.configureGuidesOption = CG_OPTION_EDIT_STEP;
          state.configureGuidesEditStepsState.currentAction =
            CG_EDIT_STEP_START;
          break;
        case CG_OPTION_REORDER_STEP:
          state.configureGuidesOption = CG_OPTION_REORDER_STEP;
          state.configureGuidesReorderStepsState.currentAction =
            CG_REORDER_STEP_START;
          break;
        case CG_OPTION_DELETE_GUIDE:
          state.configureGuidesOption = CG_OPTION_DELETE_GUIDE;
          state.configureGuidesDeleteGuidesState.currentAction =
            CG_DELETE_GUIDE_START;
          break;
        default:
          break;
      }
    },
    //Configure Guide - Add New Guide Actions
    actionConfigureGuidesNewCurrentAction: (
      state,
      { payload: { action, data } }
    ) => {
      switch (action) {
        case '':
          state.configureGuidesNewState.currentAction = '';
          state.configureGuidesNewState.guideTitle = '';
          state.configureGuidesNewState.currentDomTarget = '';
          state.configureGuidesNewState.steps = [];
          break;
        case CG_NEW_START:
          state.configureGuidesNewState.currentAction = CG_NEW_START;
          state.configureGuidesNewState.guideTitle = data.title;
          break;
        case CG_NEW_DOM_SELECT:
          state.configureGuidesNewState.currentAction = CG_NEW_DOM_SELECT;
          break;
        case CG_NEW_ADD_DETAILS:
          state.configureGuidesNewState.currentAction = CG_NEW_ADD_DETAILS;
          state.configureGuidesNewState.currentDomTarget = data;
          break;
        case CG_NEW_CONFIRM_STEP:
          state.configureGuidesNewState.currentAction = CG_NEW_CONFIRM_STEP;
          state.configureGuidesNewState.roleVisibilityList =
            data.roleVisibilityList;
          state.configureGuidesNewState.guideTitle = data.guideTitle;
          state.configureGuidesNewState.steps = [
            ...state.configureGuidesNewState.steps,
            {
              title: data.stepName,
              content: data.stepContent,
              target: state.configureGuidesNewState.currentDomTarget,
              disableBeacon: true,
            },
          ];
          break;
        default:
          break;
      }
    },
    //Configure Tour - Add Steps to Existing TOur
    actionConfigureGuidesAddStepsCurrentAction: (
      state,
      { payload: { action, data } }
    ) => {
      switch (action) {
        case '':
          state.configureGuidesAddStepsState.currentAction = '';
          state.configureGuidesAddStepsState.guideTitle = '';
          state.configureGuidesAddStepsState.currentDomTarget = '';
          state.configureGuidesAddStepsState.steps = [];
          break;
        case CG_ADD_STEP_START:
          state.configureGuidesAddStepsState.currentAction = CG_ADD_STEP_START;

          break;
        case CG_ADD_STEP_INSERTION_POINT:
          state.configureGuidesAddStepsState.currentAction =
            CG_ADD_STEP_INSERTION_POINT;
          state.configureGuidesAddStepsState.oldGuide = data.oldGuide;
          state.configureGuidesAddStepsState.selectedGuideId = data.guideId;
          break;
        case CG_ADD_STEP_PROMPT:
          state.configureGuidesAddStepsState.currentAction = CG_ADD_STEP_PROMPT;
          state.configureGuidesAddStepsState.insertionIndex =
            data.insertionIndex;
          state.configureGuidesAddStepsState.guideTitle = data.title;
          break;

        case CG_ADD_STEP_DOM_SELECT:
          state.configureGuidesAddStepsState.currentAction =
            CG_ADD_STEP_DOM_SELECT;
          break;

        case CG_ADD_STEP_ADD_DETAILS:
          state.configureGuidesAddStepsState.currentAction =
            CG_ADD_STEP_ADD_DETAILS;
          state.configureGuidesAddStepsState.currentDomTarget =
            data.currentDomTarget;
          break;
        case CG_ADD_STEP_CONFIRM_STEPS:
          state.configureGuidesAddStepsState.currentAction =
            CG_ADD_STEP_CONFIRM_STEPS;
          state.configureGuidesAddStepsState.steps = [
            ...state.configureGuidesAddStepsState.steps,
            {
              title: data.stepName,
              content: data.stepContent,
              target: state.configureGuidesAddStepsState.currentDomTarget,
              disableBeacon: true,
            },
          ];
          break;

        default:
          break;
      }
    },
    //Configure Tour - Edit Steps to Existing TOur
    actionConfigureGuidesEditStepsCurrentAction: (
      state,
      { payload: { action, data } }
    ) => {
      switch (action) {
        case '':
          state.configureGuidesEditStepsState.currentAction = '';
          state.configureGuidesEditStepsState.guideTitle = '';
          state.configureGuidesEditStepsState.currentDomTarget = '';
          state.configureGuidesEditStepsState.steps = [];
          break;
        case CG_EDIT_STEP_START:
          state.configureGuidesEditStepsState.currentAction =
            CG_EDIT_STEP_START;
          break;

        case CG_EDIT_STEP_EDIT_DETAILS:
          state.configureGuidesEditStepsState.currentAction =
            CG_EDIT_STEP_EDIT_DETAILS;
          state.configureGuidesEditStepsState.selectedGuideId = data.guideId;
          state.configureGuidesEditStepsState.oldGuide = data.oldGuide;
          break;
        case CG_EDIT_STEP_EDIT_CONFIRM:
          state.configureGuidesEditStepsState.currentAction =
            CG_EDIT_STEP_EDIT_CONFIRM;
          state.configureGuidesEditStepsState.newGuide = data.newGuide;
          break;

        default:
          break;
      }
    },
    //Configure Tour - Reorder Steps to Existing TOur
    actionConfigureGuidesReorderStepsCurrentAction: (
      state,
      { payload: { action, data } }
    ) => {
      switch (action) {
        case '':
          state.configureGuidesReorderStepsState.currentAction = '';
          state.configureGuidesReorderStepsState.guideTitle = '';
          state.configureGuidesReorderStepsState.currentDomTarget = '';
          state.configureGuidesReorderStepsState.steps = [];
          break;
        case CG_REORDER_STEP_START:
          state.configureGuidesReorderStepsState.currentAction =
            CG_REORDER_STEP_START;
          break;
        case CG_REORDER_STEP_CHANGE_ORDER:
          state.configureGuidesReorderStepsState.currentAction =
            CG_REORDER_STEP_CHANGE_ORDER;
          state.configureGuidesReorderStepsState.guideId = data.guideId;
          state.configureGuidesReorderStepsState.oldGuide = data.oldGuide;
          break;
        case CG_REORDER_STEP_CONFIRM:
          state.configureGuidesReorderStepsState.currentAction =
            CG_REORDER_STEP_CONFIRM;
          state.configureGuidesReorderStepsState.newGuide = data.newGuide;
          break;

        default:
          break;
      }
    },
    //Configure Tour - Delete Guides
    actionConfigureGuidesDeleteGuidesCurrentAction: (
      state,
      { payload: { action, data } }
    ) => {
      switch (action) {
        case '':
          state.configureGuidesDeleteGuidesState.currentAction = '';
          state.configureGuidesDeleteGuidesState.guideTitle = '';
          state.configureGuidesDeleteGuidesState.currentDomTarget = '';
          state.configureGuidesDeleteGuidesState.steps = [];
          break;
        case CG_DELETE_GUIDE_START:
          state.configureGuidesDeleteGuidesState.currentAction =
            CG_DELETE_GUIDE_START;
          break;
        case CG_DELETE_GUIDE_CONFIRM:
          state.configureGuidesDeleteGuidesState.currentAction =
            CG_DELETE_GUIDE_CONFIRM;
          state.configureGuidesDeleteGuidesState.guideIdsToDelete =
            data.guideIdsToDelete;
          break;
        default:
          break;
      }
    },
    //Setup Roles State
    actionSetupRolesCurrentAction: (state, { payload: { action, data } }) => {
      switch (action) {
        case '':
          state.setupRolesState.currentAction = '';
          state.setupRolesState.oldRoles = {};
          state.setupRolesState.newRoles = {};
          break;
        case SR_SETUP_START:
          state.setupRolesState.currentAction = SR_SETUP_START;
          break;
        case SR_SETUP_CONFIRM:
          state.setupRolesState.currentAction = SR_SETUP_CONFIRM;
          state.setupRolesState.oldRoles = data.oldRoles;
          state.setupRolesState.newRoles = data.newRoles;
          break;
        default:
          break;
      }
    },
    //Setup Guide Visibility
    actionGuideVisibilityCurrentAction: (
      state,
      { payload: { action, data } }
    ) => {
      switch (action) {
        case '':
          state.guideVisibility.currentAction = '';
          break;
        case GV_SETUP_START:
          state.guideVisibility.currentAction = GV_SETUP_START;
          break;
        case GV_SETUP_CONFIRM:
          state.guideVisibility.currentAction = GV_SETUP_CONFIRM;
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
  actionMenuOption,
  actionConfigureGuidesOption,
  actionConfigureGuidesNewCurrentAction,
  actionConfigureGuidesAddStepsCurrentAction,
  actionConfigureGuidesEditStepsCurrentAction,
  actionConfigureGuidesReorderStepsCurrentAction,
  actionConfigureGuidesDeleteGuidesCurrentAction,
  actionSetupRolesCurrentAction,
  actionGuideVisibilityCurrentAction,
} = menuSlice.actions;

export default menuSlice.reducer;
