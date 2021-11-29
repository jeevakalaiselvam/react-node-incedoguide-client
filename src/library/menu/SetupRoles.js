import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_OPTION_SETUP_ROLES } from '../menuconstants/menuOptions';
import AddNewGuide from './configureguide/AddNewGuide';
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
} from 'reactstrap';
import {
  actionConfigureGuidesOption,
  actionMenuOption,
  actionMenuToggle,
} from '../redux/slice/menuSlice';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../menuconstants/mainMenu';
import { CONFIGURE_GUIDE_MENU_OPTIONS } from '../menuconstants/configureGuide';
import AddStepsExistingGuide from './configureguide/AddStepsExistingGuide';
import EditStepsExisting from './configureguide/EditStepsExisting';
import ReorderStepsExisting from './configureguide/ReorderStepsExisting';
import DeleteGuides from './configureguide/DeleteGuides';

export default function SetupRoles() {
  const menu = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const { projectDetails } = user;
  const { projectRoles } = projectDetails;
  const dispatch = useDispatch();
  const { menuOption } = menu;
  const [roleSelected, setRoleSelected] = useState(MAIN_ADMIN);

  const roleSelectHandler = (e) => {
    e.persist();
    setRoleSelected((old) => e.target.value);
  };

  useEffect(() => {
    //console.log(roleSelected);
  }, [roleSelected]);

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={menuOption === MENU_OPTION_SETUP_ROLES}
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
              {projectRoles &&
                Object.keys(projectRoles).map((roleKey) => {
                  return <option key={roleKey}>{roleKey}</option>;
                })}
            </Input>
          </FormGroup>
          {/* List all the Users for Roles */}
          <h5>Users present in Roles</h5>
          <ListGroup>
            {projectRoles &&
              projectRoles[roleSelected].length !== 0 &&
              projectRoles[roleSelected].map((user) => {
                return <ListGroupItem key={user}>{user}</ListGroupItem>;
              })}
            {projectRoles && projectRoles[roleSelected].length === 0 && (
              <p>No Users Present!</p>
            )}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {}}>
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
      {/* Render all Components under Setup Roles */}
    </>
  );
}
