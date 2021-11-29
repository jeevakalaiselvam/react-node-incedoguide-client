import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesReorderStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_REORDER_STEP_CHANGE_ORDER,
  CG_REORDER_STEP_CONFIRM,
} from '../../../menuconstants/CG_ReorderStep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function RSE_2_StepOrder() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { configureGuidesReorderStepsState } = menu;
  const { selectedGuideId, oldGuide } = configureGuidesReorderStepsState;
  const { steps, guideId, projectId, identifier, title } = oldGuide;
  const dispatch = useDispatch();
  const [selectedStep, setSelectedStep] = useState(0);
  const [newGuide, setNewGuide] = useState(oldGuide);

  useEffect(() => {
    console.log(newGuide.steps);
  }, [newGuide]);

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesReorderStepsState.currentAction ===
          CG_REORDER_STEP_CHANGE_ORDER
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionConfigureGuidesReorderStepsCurrentAction({ action: '' })
            );
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Reorder Steps
        </ModalHeader>
        <ModalBody>
          {newGuide.steps.length !== 0 &&
            newGuide.steps.map((step, index) => {
              return (
                <Card className="mt-2" key={index}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      padding: '10px',
                    }}
                  >
                    <div style={{ flex: '1' }}>
                      <CardBody>
                        <CardTitle tag="h5">Step {index + 1}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                          {step.title}
                        </CardSubtitle>
                        <CardText>{step.content}</CardText>
                      </CardBody>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                    >
                      {index !== 0 && (
                        <Button
                          className="m-2"
                          onClick={() => {
                            let newSteps = [...newGuide.steps];
                            let stepFrom = newSteps[index];
                            let stepTo = newSteps[index - 1];
                            newSteps[index] = stepTo;
                            newSteps[index - 1] = stepFrom;

                            setNewGuide((old) => {
                              return {
                                ...old,
                                steps: newSteps,
                              };
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                      )}
                      {index !== steps.length - 1 && (
                        <Button
                          className="m-2"
                          onClick={() => {
                            let newSteps = [...newGuide.steps];
                            let stepFrom = newSteps[index];
                            let stepTo = newSteps[index + 1];
                            newSteps[index] = stepTo;
                            newSteps[index + 1] = stepFrom;

                            setNewGuide((old) => {
                              console.log({
                                ...old,
                                steps: newSteps,
                              });
                              return {
                                ...old,
                                steps: newSteps,
                              };
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          {newGuide.steps.length === 0 && <h2>No Steps Present</h2>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              console.log(newGuide);
              dispatch(
                actionConfigureGuidesReorderStepsCurrentAction({
                  action: CG_REORDER_STEP_CONFIRM,
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
                actionConfigureGuidesReorderStepsCurrentAction({ action: '' })
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
