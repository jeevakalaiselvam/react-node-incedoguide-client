/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useSelector } from 'react-redux';
import { GV_SETUP_START } from '../menuconstants/guideVisibility';
import GV_1_Start from './guidevisibility/GV_1_Start';

export default function GuideVisibility() {
  const menu = useSelector((state) => state.menu);
  const { guideVisibility } = menu;

  return (
    <>{guideVisibility.currentAction === GV_SETUP_START && <GV_1_Start />}</>
  );
}
