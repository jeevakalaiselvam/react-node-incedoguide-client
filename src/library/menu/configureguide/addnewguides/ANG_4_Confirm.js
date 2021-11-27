import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  CG_NEW_CONFIRM_STEP,
  CG_NEW_START,
} from '../../../menuconstants/CG_New';
import {
  actionConfigureGuidesNewCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { apiAddNewGuide } from '../../../redux/slice/projectSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';

export default function ANG_4_Confirm() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);

  const { currentEnvironment, identifier } = project;
  const { configureGuidesNewState } = menu;
  const { projectDetails } = user;

  const dispatch = useDispatch();
  const { projectId } = projectDetails;

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={configureGuidesNewState.currentAction === CG_NEW_CONFIRM_STEP}
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(actionConfigureGuidesNewCurrentAction({ action: '' }));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Confirm the steps
        </ModalHeader>
        <ModalBody>Confirm the steps</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                apiAddNewGuide({
                  projectId,
                  identifier,
                  title: configureGuidesNewState.guideTitle,
                  steps: configureGuidesNewState.steps,
                  currentEnvironment,
                })
              );
              dispatch(
                actionConfigureGuidesNewCurrentAction({
                  action: '',
                })
              );
              dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
            }}
          >
            OK
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch(
                actionConfigureGuidesNewCurrentAction({
                  action: CG_NEW_START,
                  data: {
                    title: configureGuidesNewState.guideTitle,
                  },
                })
              );
            }}
          >
            Add New Step
          </Button>
          <Button
            onClick={() => {
              dispatch(actionMenuOption(''));
              dispatch(actionConfigureGuidesNewCurrentAction({ action: '' }));
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
