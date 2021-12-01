import React, { useState, useEffect } from 'react';
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
  Alert,
  FormFeedback,
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
  const [guideTitle, setGuideTitle] = useState(
    configureGuidesNewState.guideTitle || ''
  );
  const [stepName, setStepName] = useState('');
  const [stepContent, setStepContent] = useState('');
  const [roleVisibilityList, setRoleVisibilityList] = useState(
    roleVisibilityListInState
  );
  const allRolesWithoutAdminRole = Object.keys(projectRoles).filter(
    (role) => role !== MAIN_ADMIN
  );

  //Validation States
  const [validity, setValidity] = useState({});
  //Checking Validation on each data change
  useEffect(() => {
    guideTitle !== ''
      ? setValidity((old) => ({ ...old, guideTitle: { isValid: true } }))
      : setValidity((old) => ({
          ...old,
          guideTitle: {
            isValid: false,
            invalidMessage: 'Guide Title cannot be empty',
          },
        }));
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
  }, [guideTitle, stepName, stepContent]);

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
                    valid={validity['guideTitle']?.isValid || false}
                    invalid={!validity['guideTitle']?.isValid || false}
                    onChange={(e) => {
                      setGuideTitle(e.currentTarget.value);
                    }}
                    value={guideTitle}
                  />
                  <FormFeedback invalid="true">
                    {validity['guideTitle']?.invalidMessage}
                  </FormFeedback>
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
              } else {
              }
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
