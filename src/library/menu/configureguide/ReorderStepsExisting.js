/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useSelector } from 'react-redux';

import RSE_1_Start from './reordersteps/RSE_1_Start';
import {
  CG_REORDER_STEP_CHANGE_ORDER,
  CG_REORDER_STEP_CONFIRM,
  CG_REORDER_STEP_START,
} from '../../menuconstants/CG_ReorderStep';
import RSE_2_StepOrder from './reordersteps/RSE_2_StepOrder';
import RSE_3_ConfirmDetails from './reordersteps/RSE_3_ConfirmDetails';

export default function ReorderStepsExisting() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesReorderStepsState } = menu;

  return (
    <>
      {configureGuidesReorderStepsState.currentAction ===
        CG_REORDER_STEP_START && <RSE_1_Start />}
      {configureGuidesReorderStepsState.currentAction ===
        CG_REORDER_STEP_CHANGE_ORDER && <RSE_2_StepOrder />}
      {configureGuidesReorderStepsState.currentAction ===
        CG_REORDER_STEP_CONFIRM && <RSE_3_ConfirmDetails />}
    </>
  );
}
