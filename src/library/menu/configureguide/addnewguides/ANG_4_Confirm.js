import React from 'react';
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
  Badge,
} from 'reactstrap';
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
  const { steps } = configureGuidesNewState;
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
        <ModalBody>
          {steps.length === 0 && <h3>No Steps present </h3>}
          {steps.length !== 0 &&
            steps.map(({ title, content }, index) => (
              <Card key={index} className="mt-2">
                <CardBody>
                  <Badge color="primary">Step {index + 1}</Badge>
                  <CardTitle tag="h5" className="mt-2">
                    {title}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {content}
                  </CardSubtitle>
                </CardBody>
              </Card>
            ))}
        </ModalBody>
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
                  roleVisibilityList:
                    configureGuidesNewState.roleVisibilityList,
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
                    roleVisibilityList:
                      configureGuidesNewState.roleVisibilityList,
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
