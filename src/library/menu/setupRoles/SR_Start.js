import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_OPTION_SETUP_ROLES } from '../../menuconstants/menuOptions';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  Label,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem,
  InputGroup,
} from 'reactstrap';
import {
  actionConfigureGuidesDeleteGuidesCurrentAction,
  actionConfigureGuidesOption,
  actionMenuOption,
  actionMenuToggle,
  actionSetupRolesCurrentAction,
} from '../../redux/slice/menuSlice';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import { SR_SETUP_CONFIRM, SR_SETUP_START } from '../../menuconstants/SR_Setup';

export default function SR_Start() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const { projectDetails } = user;
  const { projectRoles } = projectDetails;
  const dispatch = useDispatch();
  const { menuOption } = menu;
  const { setupRolesState } = menu;
  const [roleSelected, setRoleSelected] = useState(MAIN_ADMIN);
  const [newUser, setNewUser] = useState('');
  const [newRoles, setNewRoles] = useState(projectRoles);

  const roleSelectHandler = (e) => {
    e.persist();
    setRoleSelected((old) => e.target.value);
  };

  const newUserChangeHandler = (e) => {
    e.persist();
    setNewUser((old) => e.target.value);
  };

  const newUserSubmitHandler = (e) => {
    e.persist();
    const newUserUpdatedRoles = {
      ...newRoles,
      [roleSelected]: [...newRoles[roleSelected], newUser],
    };

    setNewRoles((old) => newUserUpdatedRoles);
    console.log(newUserUpdatedRoles);
  };

  useEffect(() => {}, [roleSelected]);

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={setupRolesState.currentAction === SR_SETUP_START}
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Setup Roles for Users
        </ModalHeader>
        <ModalBody>
          {/* List all the Roles */}
          <FormGroup>
            <Label for="role">Select Role</Label>
            <Input
              id="role"
              name="role"
              type="select"
              value={roleSelected}
              onChange={roleSelectHandler}
            >
              {newRoles &&
                Object.keys(newRoles).map((roleKey) => {
                  return <option key={roleKey}>{roleKey}</option>;
                })}
            </Input>
          </FormGroup>
          {/* List all the Users for Roles */}
          <h5>Users present in Roles</h5>
          <ListGroup>
            {newRoles &&
              newRoles[roleSelected].length !== 0 &&
              newRoles[roleSelected].map((user) => {
                return (
                  <React.Fragment key={user}>
                    <ListGroupItem>{user}</ListGroupItem>
                  </React.Fragment>
                );
              })}
            {newRoles && newRoles[roleSelected].length === 0 && (
              <p>No Users Present!</p>
            )}
          </ListGroup>
          <FormGroup className="mt-3">
            <Label for="newUser">Add New User</Label>
            <InputGroup>
              <Input
                id="newUser"
                value={newUser}
                name="newUser"
                onChange={newUserChangeHandler}
                placeholder="Enter New User ID"
                type="text"
              />
              <Button onClick={newUserSubmitHandler}>Add User</Button>
            </InputGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                actionSetupRolesCurrentAction({
                  action: SR_SETUP_CONFIRM,
                  data: {
                    oldRoles: projectRoles,
                    newRoles,
                  },
                })
              );
            }}
          >
            Confirm
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch(actionMenuOption(''));
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
