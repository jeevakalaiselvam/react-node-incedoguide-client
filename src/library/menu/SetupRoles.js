import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_OPTION_SETUP_ROLES } from '../menuconstants/menuOptions';
import AddNewGuide from './configureguide/AddNewGuide';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  Label,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem,
  InputGroup,
} from 'reactstrap';
import {
  actionConfigureGuidesOption,
  actionMenuOption,
  actionMenuToggle,
} from '../redux/slice/menuSlice';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../menuconstants/mainMenu';
import { CONFIGURE_GUIDE_MENU_OPTIONS } from '../menuconstants/configureGuide';
import AddStepsExistingGuide from './configureguide/AddStepsExistingGuide';
import EditStepsExisting from './configureguide/EditStepsExisting';
import ReorderStepsExisting from './configureguide/ReorderStepsExisting';
import DeleteGuides from './configureguide/DeleteGuides';
import { SR_SETUP_CONFIRM, SR_SETUP_START } from '../menuconstants/SR_Setup';
import SR_Start from './setupRoles/SR_Start';
import SR_Confirm from './setupRoles/SR_Confirm';

export default function SetupRoles() {
  const menu = useSelector((state) => state.menu);
  const { setupRolesState } = menu;

  return (
    <>
      {setupRolesState.currentAction === SR_SETUP_START && <SR_Start />}
      {setupRolesState.currentAction === SR_SETUP_CONFIRM && <SR_Confirm />}
    </>
  );
}
