import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_OPTION_SETUP_ROLES } from '../../menuconstants/menuOptions';
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
  actionConfigureGuidesDeleteGuidesCurrentAction,
  actionConfigureGuidesOption,
  actionMenuOption,
  actionMenuToggle,
  actionSetupRolesCurrentAction,
} from '../../redux/slice/menuSlice';
import { apiUpdateProjectRoles } from '../../redux/slice/userSlice';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import {
  SR_SETUP_CONFIRM,
  SR_SETUP_UPDATE,
} from '../../menuconstants/SR_Setup';

export default function SR_Confirm() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const { currentEnvironment } = project;
  const { projectDetails, userDetails } = user;
  const { projectId } = projectDetails;
  const { userId, currentUserId } = userDetails;
  const { projectRoles } = projectDetails;
  const dispatch = useDispatch();
  const { menuOption } = menu;
  const { setupRolesState } = menu;
  const { newRoles } = setupRolesState;

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={setupRolesState.currentAction === SR_SETUP_CONFIRM}
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Update Roles?
        </ModalHeader>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                apiUpdateProjectRoles({
                  userId,
                  projectId,
                  projectRoles: newRoles,
                  environment: currentEnvironment,
                })
              );
            }}
          >
            YES
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch(actionMenuOption(''));
              dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
