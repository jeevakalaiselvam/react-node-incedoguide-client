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
  CardText,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesReorderStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import { apiUpdateGuide } from '../../../redux/slice/projectSlice';
import { CG_REORDER_STEP_CONFIRM } from '../../../menuconstants/CG_ReorderStep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function RSE_3_ConfirmDetails() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { currentEnvironment } = project;
  const { configureGuidesReorderStepsState } = menu;
  const { newGuide } = configureGuidesReorderStepsState;
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesReorderStepsState.currentAction ===
          CG_REORDER_STEP_CONFIRM
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
          Confirm New Order
        </ModalHeader>
        <ModalBody>
          {newGuide.steps.length !== 0 && (
            <>
              {newGuide.steps.map((step, index) => {
                return (
                  <React.Fragment key={index}>
                    <Card className="m-2">
                      <CardBody>
                        <CardTitle tag="h5">Step {index + 1}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                          {step.title}
                        </CardSubtitle>
                        <CardText>{step.content}</CardText>
                      </CardBody>
                    </Card>
                    {index !== newGuide.steps.length - 1 && (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}
          {newGuide.steps.length === 0 && <h2>All Steps Removed </h2>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                apiUpdateGuide({
                  guide: newGuide,
                  currentEnvironment,
                })
              );
              dispatch(
                actionConfigureGuidesReorderStepsCurrentAction({
                  action: '',
                })
              );
              dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
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
