import React from 'react';
import { useSelector } from 'react-redux';
import ANG_2_DomSelect from './addnewguides/ANG_2_DomSelect';
import {
  CG_NEW_ADD_DETAILS,
  CG_NEW_CONFIRM_STEP,
  CG_NEW_DOM_SELECT,
  CG_NEW_START,
} from '../../menuconstants/CG_New';
import ANG_3_AddDetails from './addnewguides/ANG_3_AddDetails';
import ANG_4_Confirm from './addnewguides/ANG_4_Confirm';
import ANG_1_Start from './addnewguides/ANG_1_Start';

export default function AddNewGuide() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesNewState } = menu;

  return (
    <>
      {configureGuidesNewState.currentAction === CG_NEW_START && (
        <ANG_1_Start />
      )}
      {configureGuidesNewState.currentAction === CG_NEW_DOM_SELECT && (
        <ANG_2_DomSelect />
      )}
      {configureGuidesNewState.currentAction === CG_NEW_ADD_DETAILS && (
        <ANG_3_AddDetails />
      )}
      {configureGuidesNewState.currentAction === CG_NEW_CONFIRM_STEP && (
        <ANG_4_Confirm />
      )}
    </>
  );
}
