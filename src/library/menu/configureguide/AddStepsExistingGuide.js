import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CG_ADD_STEP_ADD_DETAILS,
  CG_ADD_STEP_CONFIRM_STEPS,
  CG_ADD_STEP_DOM_SELECT,
  CG_ADD_STEP_INSERTION_POINT,
  CG_ADD_STEP_PROMPT,
  CG_ADD_STEP_START,
} from '../../menuconstants/CG_AddStep';
import ASEG_1_Start from './addstepsexisting/ASEG_1_Start';
import ASEG_2_InsertionPoint from './addstepsexisting/ASEG_2_InsertionPoint';
import ASEG_4_DomSelect from './addstepsexisting/ASEG_4_DomSelect';
import ASEG_5_AddDetails from './addstepsexisting/ASEG_5_AddDetails';
import ASEG_3_Prompt from './addstepsexisting/ASEG_3_Prompt';
import ASEG_6_Confirm from './addstepsexisting/ASEG_6_Confirm';

export default function AddStepsExistingGuide() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesAddStepsState } = menu;
  const dispatch = useDispatch();

  return (
    <>
      {configureGuidesAddStepsState.currentAction === CG_ADD_STEP_START && (
        <ASEG_1_Start />
      )}
      {configureGuidesAddStepsState.currentAction ===
        CG_ADD_STEP_INSERTION_POINT && <ASEG_2_InsertionPoint />}
      {configureGuidesAddStepsState.currentAction === CG_ADD_STEP_PROMPT && (
        <ASEG_3_Prompt />
      )}
      {configureGuidesAddStepsState.currentAction ===
        CG_ADD_STEP_DOM_SELECT && <ASEG_4_DomSelect />}
      {configureGuidesAddStepsState.currentAction ===
        CG_ADD_STEP_ADD_DETAILS && <ASEG_5_AddDetails />}
      {configureGuidesAddStepsState.currentAction ===
        CG_ADD_STEP_CONFIRM_STEPS && <ASEG_6_Confirm />}
    </>
  );
}
