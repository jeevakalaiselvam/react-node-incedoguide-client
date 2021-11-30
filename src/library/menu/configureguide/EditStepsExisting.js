/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  CG_EDIT_STEP_EDIT_CONFIRM,
  CG_EDIT_STEP_EDIT_DETAILS,
  CG_EDIT_STEP_START,
} from '../../menuconstants/CG_EditStep';
import ESE_1_Start from './editstepsexisting/ESE_1_Start';
import ESE_2_EditDetails from './editstepsexisting/ESE_2_EditDetails';
import ESE_3_ConfirmDetails from './editstepsexisting/ESE_3_ConfirmDetails';

export default function EditStepsExisting() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesEditStepsState } = menu;

  return (
    <>
      {configureGuidesEditStepsState.currentAction === CG_EDIT_STEP_START && (
        <ESE_1_Start />
      )}
      {configureGuidesEditStepsState.currentAction ===
        CG_EDIT_STEP_EDIT_DETAILS && <ESE_2_EditDetails />}
      {configureGuidesEditStepsState.currentAction ===
        CG_EDIT_STEP_EDIT_CONFIRM && <ESE_3_ConfirmDetails />}
    </>
  );
}
