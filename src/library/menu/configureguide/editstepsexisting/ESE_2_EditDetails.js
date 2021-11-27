import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
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
  CG_EDIT_STEP_START,
} from '../../../menuconstants/CG_EditStep';

export default function ESE_2_EditDetails() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { configureGuidesEditStepsState } = menu;
  const { selectedGuideId, oldGuide } = configureGuidesEditStepsState;
  const { steps, guideId, projectId, identifier, title } = oldGuide;
  const dispatch = useDispatch();
  const [selectedStep, setSelectedStep] = useState(0);
  const [newGuide, setNewGuide] = useState(oldGuide);

  const guideStepSelectedHandler = (e) => {
    e.persist();
    setSelectedStep((old) => e.target.value);
  };

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
                  onChange={(e) => {
                    e.persist();
                    setNewGuide((old) => ({ ...old, title: e.target.value }));
                  }}
                  value={newGuide.title}
                />
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
                </FormGroup>
                <FormGroup>
                  <Label for="stepDescription">Step Description</Label>
                  <Input
                    id="stepDescription"
                    name="stepDescription"
                    placeholder=""
                    type="text"
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
                </FormGroup>
                <Button
                  color="danger"
                  outline
                  onClick={() => {
                    const newSteps = newGuide.steps.filter(
                      (_, index) => +selectedStep !== index
                    );
                    setNewGuide((old) => ({
                      ...old,
                      steps: newSteps,
                    }));
                    setSelectedStep((old) => 0);
                  }}
                >
                  Delete Step {+selectedStep + 1}
                </Button>
              </FormGroup>
            </>
          )}
          {newGuide.steps.length === 0 && <h2>All Steps Deleted</h2>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              console.log(newGuide);
              dispatch(
                actionConfigureGuidesEditStepsCurrentAction({
                  action: CG_EDIT_STEP_EDIT_CONFIRM,
                  data: {
                    newGuide: newGuide,
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
