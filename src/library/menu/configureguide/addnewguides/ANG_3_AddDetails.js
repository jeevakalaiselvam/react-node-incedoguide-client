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
  CG_NEW_ADD_DETAILS,
  CG_NEW_CONFIRM_STEP,
} from '../../../menuconstants/CG_New';
import {
  actionConfigureGuidesNewCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';

export default function ANG_3_AddDetails() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesNewState } = menu;
  const dispatch = useDispatch();
  const [guideTitle, setGuideTitle] = useState('');
  const [stepName, setStepName] = useState('');
  const [stepContent, setStepContent] = useState('');

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={configureGuidesNewState.currentAction === CG_NEW_ADD_DETAILS}
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
            {configureGuidesNewState.guideTitle === '' && (
              <FormGroup>
                <Label for="guideTitle">Guide Title</Label>
                <Input
                  id="guideTitle"
                  name="guideTitle"
                  placeholder=""
                  type="text"
                  onChange={(e) => {
                    setGuideTitle(e.currentTarget.value);
                  }}
                  value={guideTitle}
                />
              </FormGroup>
            )}
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
              const titleAlreadyPresentInState =
                configureGuidesNewState.guideTitle !== '';
              dispatch(
                actionConfigureGuidesNewCurrentAction({
                  action: CG_NEW_CONFIRM_STEP,
                  data: {
                    stepName,
                    stepContent,
                    guideTitle: titleAlreadyPresentInState
                      ? configureGuidesNewState.guideTitle
                      : guideTitle,
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
