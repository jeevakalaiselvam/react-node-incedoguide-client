/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useSelector } from 'react-redux';
import DG_1_Start from './deleteguides/DG_1_Start';
import {
  CG_DELETE_GUIDE_CONFIRM,
  CG_DELETE_GUIDE_START,
} from '../../menuconstants/CG_DeleteGuide';
import DG_2_Confirm from './deleteguides/DG_2_Confirm';

export default function DeleteGuides() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesDeleteGuidesState } = menu;

  return (
    <>
      {configureGuidesDeleteGuidesState.currentAction ===
        CG_DELETE_GUIDE_START && <DG_1_Start />}
      {configureGuidesDeleteGuidesState.currentAction ===
        CG_DELETE_GUIDE_CONFIRM && <DG_2_Confirm />}
    </>
  );
}
