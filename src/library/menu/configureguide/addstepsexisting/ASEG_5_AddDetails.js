import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesAddStepsCurrentAction,
  actionConfigureGuidesNewCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_ADD_STEP_ADD_DETAILS,
  CG_ADD_STEP_CONFIRM_STEPS,
} from '../../../menuconstants/CG_AddStep';

export default function ASEG_5_AddDetails() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesAddStepsState } = menu;
  const { guideTitle } = configureGuidesAddStepsState;
  const dispatch = useDispatch();
  const [stepName, setStepName] = useState('');
  const [stepContent, setStepContent] = useState('');

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesAddStepsState.currentAction === CG_ADD_STEP_ADD_DETAILS
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(actionConfigureGuidesNewCurrentAction({ action: '' }));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Add Details for the Guide
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="guideTitle">Guide Title</Label>
              <Input
                id="guideTitle"
                name="guideTitle"
                placeholder=""
                disabled={true}
                type="text"
                value={guideTitle}
              />
            </FormGroup>
            <FormGroup>
              <Label for="stepName">Step Name</Label>
              <Input
                id="stepName"
                name="stepName"
                placeholder=""
                type="text"
                onChange={(e) => {
                  setStepName(e.currentTarget.value);
                }}
                value={stepName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="stepDescription">Step Description</Label>
              <Input
                id="stepDescription"
                name="stepDescription"
                placeholder=""
                type="text"
                onChange={(e) => {
                  setStepContent(e.currentTarget.value);
                }}
                value={stepContent}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                actionConfigureGuidesAddStepsCurrentAction({
                  action: CG_ADD_STEP_CONFIRM_STEPS,
                  data: {
                    stepName,
                    stepContent,
                  },
                })
              );
            }}
          >
            CONFIRM
          </Button>{' '}
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
