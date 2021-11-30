/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useSelector } from 'react-redux';
import { SR_SETUP_CONFIRM, SR_SETUP_START } from '../menuconstants/SR_Setup';
import SR_1_Start from './setupRoles/SR_1_Start';
import SR_2_Confirm from './setupRoles/SR_2_Confirm';

export default function SetupRoles() {
  const menu = useSelector((state) => state.menu);
  const { setupRolesState } = menu;

  return (
    <>
      {setupRolesState.currentAction === SR_SETUP_START && <SR_1_Start />}
      {setupRolesState.currentAction === SR_SETUP_CONFIRM && <SR_2_Confirm />}
    </>
  );
}
