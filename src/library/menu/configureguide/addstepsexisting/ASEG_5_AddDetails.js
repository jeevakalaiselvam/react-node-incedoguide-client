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
  FormFeedback,
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
import { useEffect } from 'react';

export default function ASEG_5_AddDetails() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesAddStepsState } = menu;
  const { guideTitle } = configureGuidesAddStepsState;
  const dispatch = useDispatch();
  const [stepName, setStepName] = useState('');
  const [stepContent, setStepContent] = useState('');

  //Checking Validation
  const [validity, setValidity] = useState({});
  //Checking Validation on each data change
  useEffect(() => {
    stepName !== ''
      ? setValidity((old) => ({ ...old, stepName: { isValid: true } }))
      : setValidity((old) => ({
          ...old,
          stepName: {
            isValid: false,
            invalidMessage: 'Guide Step Title cannot be empty',
          },
        }));
    stepContent !== ''
      ? setValidity((old) => ({ ...old, stepContent: { isValid: true } }))
      : setValidity((old) => ({
          ...old,
          stepContent: {
            isValid: false,
            invalidMessage: 'Guide Step Content cannot be empty',
          },
        }));
  }, [stepName, stepContent]);

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
                valid={validity['stepName']?.isValid || false}
                invalid={!validity['stepName']?.isValid || false}
                onChange={(e) => {
                  setStepName(e.currentTarget.value);
                }}
                value={stepName}
              />
              <FormFeedback invalid="true">
                {validity['stepName']?.invalidMessage}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="stepDescription">Step Description</Label>
              <Input
                id="stepDescription"
                name="stepDescription"
                placeholder=""
                type="text"
                valid={validity['stepContent']?.isValid || false}
                invalid={!validity['stepContent']?.isValid || false}
                onChange={(e) => {
                  setStepContent(e.currentTarget.value);
                }}
                value={stepContent}
              />
              <FormFeedback invalid="true">
                {validity['stepContent']?.invalidMessage}
              </FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (
                Object.keys(validity).every(
                  (key) => validity[key].isValid === true
                )
              ) {
                dispatch(
                  actionConfigureGuidesAddStepsCurrentAction({
                    action: CG_ADD_STEP_CONFIRM_STEPS,
                    data: {
                      stepName,
                      stepContent,
                    },
                  })
                );
              } else {
              }
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
