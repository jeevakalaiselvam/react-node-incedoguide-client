import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormFeedback,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesEditStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import { FormGroup, Label } from 'reactstrap';
import {
  CG_EDIT_STEP_EDIT_CONFIRM,
  CG_EDIT_STEP_EDIT_DETAILS,
} from '../../../menuconstants/CG_EditStep';

export default function ESE_2_EditDetails() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesEditStepsState } = menu;
  const { oldGuide } = configureGuidesEditStepsState;
  const dispatch = useDispatch();
  const [selectedStep, setSelectedStep] = useState(0);
  const [newGuide, setNewGuide] = useState(oldGuide);

  const guideStepSelectedHandler = (e) => {
    e.persist();
    setSelectedStep((old) => e.target.value);
  };

  //Check Validation
  const [validity, setValidity] = useState({});
  const [titleValidity, setTitleValidity] = useState({
    isValid: true,
    invalidMessage: 'Guide Title cannot be empty',
  });

  //When title changed, Check its validation and set it in state
  useEffect(() => {
    setTitleValidity((old) => ({
      isValid: newGuide.title !== '',
      invalidMessage: 'Guide Title cannot be empty',
    }));
  }, [newGuide]);

  //When Guides are being updated, Check validation for all steps and update in state
  useEffect(() => {
    let newValidityState = {};
    newGuide.steps.forEach((step, index) => {
      newValidityState = {
        ...newValidityState,
        [index]: {
          stepTitle: {
            isValid: step.title !== '',
            invalidMessage: 'Step Title cannot be empty',
          },
          stepContent: {
            isValid: step.content !== '',
            invalidMessage: 'Step Content cannot be empty',
          },
        },
      };
    });

    setValidity((old) => newValidityState);
  }, [newGuide]);

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesEditStepsState.currentAction ===
          CG_EDIT_STEP_EDIT_DETAILS
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionConfigureGuidesEditStepsCurrentAction({ action: '' })
            );
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Edit Steps of Existing
        </ModalHeader>
        <ModalBody>
          {newGuide.steps.length !== 0 && (
            <>
              <FormGroup>
                <Label for="stepName">Guide Title</Label>
                <Input
                  id="stepName"
                  name="stepName"
                  placeholder=""
                  type="text"
                  valid={titleValidity?.isValid || false}
                  invalid={!titleValidity?.isValid || false}
                  onChange={(e) => {
                    e.persist();
                    setNewGuide((old) => ({ ...old, title: e.target.value }));
                  }}
                  value={newGuide.title}
                />
                <FormFeedback invalid="true">
                  {titleValidity?.invalidMessage}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select the Step</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={selectedStep}
                  onChange={guideStepSelectedHandler}
                >
                  {newGuide.steps.length &&
                    newGuide.steps.map(({ title }, index) => {
                      return (
                        <option key={index} value={index}>
                          Step {index + 1} - {title}
                        </option>
                      );
                    })}
                  {!newGuide.steps.length && <h1>No Steps Present</h1>}
                </Input>
                <FormGroup className="mt-3">
                  <Label for="stepName">Step Title</Label>
                  <Input
                    id="stepName"
                    name="stepName"
                    placeholder=""
                    type="text"
                    valid={validity[selectedStep]?.stepTitle?.isValid || false}
                    invalid={
                      !validity[selectedStep]?.stepTitle?.isValid || false
                    }
                    onChange={(e) => {
                      e.persist();
                      const oldSteps = [...newGuide.steps];
                      oldSteps[selectedStep] = {
                        ...oldSteps[selectedStep],
                        title: e.target.value,
                      };
                      setNewGuide((old) => ({
                        ...old,
                        steps: oldSteps,
                      }));
                    }}
                    value={newGuide.steps[selectedStep].title}
                  />
                  <FormFeedback invalid="true">
                    {validity[selectedStep]?.stepTitle?.invalidMessage}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="stepDescription">Step Content</Label>
                  <Input
                    id="stepDescription"
                    name="stepDescription"
                    placeholder=""
                    type="textarea"
                    valid={
                      validity[selectedStep]?.stepContent?.isValid || false
                    }
                    invalid={
                      !validity[selectedStep]?.stepContent?.isValid || false
                    }
                    onChange={(e) => {
                      e.persist();
                      const oldSteps = [...newGuide.steps];
                      oldSteps[selectedStep] = {
                        ...oldSteps[selectedStep],
                        content: e.target.value,
                      };
                      setNewGuide((old) => ({
                        ...old,
                        steps: oldSteps,
                      }));
                    }}
                    value={newGuide.steps[selectedStep].content}
                  />
                  <FormFeedback invalid="true">
                    {validity[selectedStep]?.stepContent?.invalidMessage}
                  </FormFeedback>
                </FormGroup>
                <Button
                  color="danger"
                  outline
                  disabled={newGuide.steps.length === 1}
                  onClick={() => {
                    //If there are more than one step, If not do not allow to delete the last step
                    if (newGuide.steps.length > 1) {
                      const newSteps = newGuide.steps.filter(
                        (_, index) => +selectedStep !== index
                      );
                      setNewGuide((old) => ({
                        ...old,
                        steps: newSteps,
                      }));
                      setSelectedStep((old) => 0);
                    } else {
                    }
                  }}
                >
                  {newGuide.steps.length === 1 && 'THIS STEP CANNOT BE DELETED'}
                  {newGuide.steps.length > 1 &&
                    `Delete Step ${+selectedStep + 1}`}
                </Button>
                {/* Show error when user tried to delete the last step in Guide */}
              </FormGroup>
            </>
          )}
          {newGuide.steps.length === 0 && <h2>All Steps Deleted</h2>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              //Only move to next step if stepTitle and stepContent for all steps are not empty
              if (
                Object.values(validity).every(
                  (step) => step.stepTitle.isValid && step.stepContent.isValid
                ) &&
                titleValidity.isValid
              ) {
                dispatch(
                  actionConfigureGuidesEditStepsCurrentAction({
                    action: CG_EDIT_STEP_EDIT_CONFIRM,
                    data: {
                      newGuide: newGuide,
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
                actionConfigureGuidesEditStepsCurrentAction({ action: '' })
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
