import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import {
  actionMenuOption,
  actionMenuToggle,
  actionSetupRolesCurrentAction,
} from '../../redux/slice/menuSlice';
import { apiUpdateProjectRoles } from '../../redux/slice/userSlice';
import { MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import { SR_SETUP_CONFIRM } from '../../menuconstants/setupRoles';

export default function SR_2_Confirm() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const { currentEnvironment } = project;
  const { projectDetails, userDetails } = user;
  const { projectId } = projectDetails;
  const { userId } = userDetails;
  const dispatch = useDispatch();
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
            dispatch(
              actionSetupRolesCurrentAction({
                action: '',
              })
            );
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
              dispatch(actionMenuOption(''));
              dispatch(
                actionSetupRolesCurrentAction({
                  action: '',
                })
              );
            }}
          >
            YES
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch(actionMenuOption(''));
              dispatch(
                actionSetupRolesCurrentAction({
                  action: '',
                })
              );
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
