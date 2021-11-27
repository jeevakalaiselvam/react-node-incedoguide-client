import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesAddStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_ADD_STEP_DOM_SELECT,
  CG_ADD_STEP_INSERTION_POINT,
  CG_ADD_STEP_PROMPT,
} from '../../../menuconstants/CG_AddStep';
import { FormGroup, Label } from 'reactstrap';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function EEG_2_InsertionPoint() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { configureGuidesAddStepsState } = menu;
  const { selectedGuideId } = configureGuidesAddStepsState;
  const currentGuide = guides.find((guide) => guide.guideId == selectedGuideId);
  const dispatch = useDispatch();

  const insertionSelectedHandler = (insertionIndex) => {
    dispatch(
      actionConfigureGuidesAddStepsCurrentAction({
        action: CG_ADD_STEP_PROMPT,
        data: {
          insertionIndex,
          title: currentGuide.title,
        },
      })
    );
  };

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesAddStepsState.currentAction ===
          CG_ADD_STEP_INSERTION_POINT
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
          Select Insertion Location
        </ModalHeader>
        <ModalBody>
          {currentGuide.steps.length !== 0 &&
            currentGuide.steps.map(({ title, content }, index) => {
              return (
                <React.Fragment key={index}>
                  <Card className="mb-2">
                    <CardBody>
                      <Badge color="primary">Step {index + 1}</Badge>
                      <CardTitle tag="h5">{title}</CardTitle>
                      <CardText>{content}</CardText>
                    </CardBody>
                  </Card>
                  <div
                    style={{ width: '100%', textAlign: 'center' }}
                    onClick={() => insertionSelectedHandler(index + 1)}
                  >
                    <Button
                      color="primary"
                      outline
                      className="mb-2"
                      size="sm"
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      Insert after Step {index + 1}
                    </Button>
                  </div>
                </React.Fragment>
              );
            })}
          {currentGuide.steps.length === 0 && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h3>No Steps Present</h3>
              <Button
                color="primary"
                outline
                className="mb-2"
                size="sm"
                style={{
                  display: 'inline-block',
                }}
              >
                Insert New Step
              </Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
