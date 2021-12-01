/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  GV_SETUP_CONFIRM,
  GV_SETUP_START,
} from '../menuconstants/guideVisibility';
import GV_1_Start from './guidevisibility/GV_1_Start';
import GV_2_Confirm from './guidevisibility/GV_2_Confirm';

export default function GuideVisibility() {
  const menu = useSelector((state) => state.menu);
  const { guideVisibilityState } = menu;
  return (
    <>
      {guideVisibilityState.currentAction === GV_SETUP_START && <GV_1_Start />}
      {guideVisibilityState.currentAction === GV_SETUP_CONFIRM && (
        <GV_2_Confirm />
      )}
    </>
  );
}
