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
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';

export default function ANG_3_AddDetails() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const { projectDetails } = user;
  const { projectRoles } = projectDetails;
  const { configureGuidesNewState } = menu;
  const { roleVisibilityList: roleVisibilityListInState } =
    configureGuidesNewState;
  const dispatch = useDispatch();
  const [guideTitle, setGuideTitle] = useState('');
  const [stepName, setStepName] = useState('');
  const [stepContent, setStepContent] = useState('');
  const [roleVisibilityList, setRoleVisibilityList] = useState(
    roleVisibilityListInState
  );
  const allRolesWithoutAdminRole = Object.keys(projectRoles).filter(
    (role) => role !== MAIN_ADMIN
  );

  const roleVisibilityCheckboxChanged = (role) => {
    setRoleVisibilityList((old) => ({ ...old, [role]: !old[role] }));
  };

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
              <React.Fragment>
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
                {/* Render all Role Check boxes */}

                <FormGroup>
                  <Label for="stepName">User Roles</Label> <br />
                  {allRolesWithoutAdminRole.map((role) => {
                    return (
                      <React.Fragment key={role}>
                        <FormGroup check inline>
                          <Input
                            type="checkbox"
                            checked={roleVisibilityList[role] || false}
                            onChange={() => roleVisibilityCheckboxChanged(role)}
                          />
                          <Label check>{role}</Label>
                        </FormGroup>
                      </React.Fragment>
                    );
                  })}
                </FormGroup>
              </React.Fragment>
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
                    roleVisibilityList,
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
