import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_OPTION_CONFIGURE_GUIDES } from '../menuconstants/menuOptions';
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
} from 'reactstrap';
import {
  actionConfigureGuidesOption,
  actionMenuOption,
  actionMenuToggle,
} from '../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../menuconstants/mainMenu';
import { CONFIGURE_GUIDE_MENU_OPTIONS } from '../menuconstants/configureGuide';
import AddStepsExistingGuide from './configureguide/AddStepsExistingGuide';
import EditStepsExisting from './configureguide/EditStepsExisting';
import ReorderStepsExisting from './configureguide/ReorderStepsExisting';
import DeleteGuides from './configureguide/DeleteGuides';

export default function ConfigureGuides() {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { menuOption } = menu;
  const [selectedOption, setSelectedOption] = useState(
    Object.keys(CONFIGURE_GUIDE_MENU_OPTIONS)[0]
  );

  const onChangeSelection = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={menuOption === MENU_OPTION_CONFIGURE_GUIDES}
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Choose your option
        </ModalHeader>
        <ModalBody>
          <Dropdown toggle={function noRefCheck() {}}>
            <FormGroup>
              <Label for="exampleSelect">Select an option</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                value={selectedOption}
                onChange={onChangeSelection}
              >
                {Object.keys(CONFIGURE_GUIDE_MENU_OPTIONS).map((key) => {
                  return (
                    <option
                      key={CONFIGURE_GUIDE_MENU_OPTIONS[key].action}
                      value={CONFIGURE_GUIDE_MENU_OPTIONS[key].action}
                    >
                      {CONFIGURE_GUIDE_MENU_OPTIONS[key].title}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Dropdown>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={function noRefCheck() {
              dispatch(actionMenuOption(''));
              dispatch(actionConfigureGuidesOption({ action: selectedOption }));
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
      {/* Render all Components under Configure Guide */}
      <AddNewGuide />
      <AddStepsExistingGuide />
      <EditStepsExisting />
      <ReorderStepsExisting />
      <DeleteGuides />
    </>
  );
}
