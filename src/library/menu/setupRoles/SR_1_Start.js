import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  FormGroup,
  ListGroup,
  ListGroupItem,
  InputGroup,
  Badge,
} from 'reactstrap';
import {
  actionMenuOption,
  actionMenuToggle,
  actionSetupRolesCurrentAction,
} from '../../redux/slice/menuSlice';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import {
  SR_SETUP_CONFIRM,
  SR_SETUP_START,
} from '../../menuconstants/setupRoles';

export default function SR_1_Start() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { projectDetails } = user;
  const { projectRoles, userId } = projectDetails;
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
  };

  const deleteUserHandler = (user) => {
    const newUserUpdatedRoles = {
      ...newRoles,
      [roleSelected]: [
        ...newRoles[roleSelected].filter(
          (alreadyPresentUser) => alreadyPresentUser !== user
        ),
      ],
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
            dispatch(
              actionSetupRolesCurrentAction({
                action: '',
              })
            );
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
          <h5>User IDS in selected role</h5>
          <ListGroup>
            {newRoles &&
              newRoles[roleSelected].length !== 0 &&
              newRoles[roleSelected].map((user) => {
                return (
                  <React.Fragment key={user}>
                    <ListGroupItem
                      style={{ display: 'flex', flexDirection: 'row' }}
                    >
                      <span style={{ flex: '1' }}>{user}</span>
                      {/* Show Delete only if user is not the main initial admin */}
                      {user + '' !== userId + '' && (
                        <Badge
                          color="danger"
                          className="incedo-delete-badge"
                          onClick={() => deleteUserHandler(user)}
                        >
                          DELETE
                        </Badge>
                      )}
                      {user + '' === userId + '' && (
                        <Badge color="success" onClick={() => {}}>
                          PROJECT ADMIN
                        </Badge>
                      )}
                    </ListGroupItem>
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
              <Button color="primary" onClick={newUserSubmitHandler}>
                Add User
              </Button>
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
              dispatch(
                actionSetupRolesCurrentAction({
                  action: '',
                })
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
