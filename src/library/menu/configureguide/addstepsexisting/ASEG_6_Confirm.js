import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesAddStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { apiUpdateGuide } from '../../../redux/slice/projectSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_ADD_STEP_CONFIRM_STEPS,
  CG_ADD_STEP_PROMPT,
} from '../../../menuconstants/CG_AddStep';

export default function ASEG_6_Confirm() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);

  const { currentEnvironment, guides } = project;
  const { configureGuidesAddStepsState } = menu;
  const { insertionIndex, guideTitle, steps, selectedGuideId } =
    configureGuidesAddStepsState;

  const dispatch = useDispatch();

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesAddStepsState.currentAction ===
          CG_ADD_STEP_CONFIRM_STEPS
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionConfigureGuidesAddStepsCurrentAction({ action: '' })
            );
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
              //Add new steps to existing Guide Steps in state
              const guideToUpdate = guides.find(
                (guide) => +guide.guideId === +selectedGuideId
              );
              const oldSteps = [...guideToUpdate.steps];
              const newGuideStepsAltered = oldSteps
                .splice(0, insertionIndex)
                .concat(steps)
                .concat(oldSteps.splice(-insertionIndex));

              //Dipatch action to update the new Guide Steps
              dispatch(
                apiUpdateGuide({
                  guide: { ...guideToUpdate, steps: newGuideStepsAltered },
                  currentEnvironment,
                })
              );
              dispatch(
                actionConfigureGuidesAddStepsCurrentAction({
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
                actionConfigureGuidesAddStepsCurrentAction({
                  action: CG_ADD_STEP_PROMPT,
                  data: {
                    insertionIndex,
                    title: guideTitle,
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
              dispatch(
                actionConfigureGuidesAddStepsCurrentAction({ action: '' })
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
