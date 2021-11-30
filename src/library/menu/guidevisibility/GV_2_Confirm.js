import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import {
  actionMenuOption,
  actionMenuToggle,
  actionGuideVisibilityCurrentAction,
} from '../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import { GV_SETUP_CONFIRM } from '../../menuconstants/guideVisibility';
import { apiUpdateGuideRoles } from '../../redux/slice/projectSlice';

export default function GV_2_Confirm() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { identifier, currentEnvironment } = project;
  const { userDetails, projectDetails } = user;
  const { projectId } = projectDetails;
  const { guideVisibilityState } = menu;
  const { rolesInGuides } = guideVisibilityState;
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={guideVisibilityState.currentAction === GV_SETUP_CONFIRM}
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionGuideVisibilityCurrentAction({
                action: '',
              })
            );
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Confirm Update?
        </ModalHeader>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                apiUpdateGuideRoles({
                  projectId,
                  identifier,
                  rolesInGuides,
                  environment: currentEnvironment,
                })
              );
              dispatch(actionMenuOption(''));
              dispatch(
                actionGuideVisibilityCurrentAction({
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
                actionGuideVisibilityCurrentAction({
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
