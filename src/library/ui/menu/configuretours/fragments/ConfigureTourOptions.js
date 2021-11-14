import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  UncontrolledDropdown,
  Label,
  Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  setConfigureTourMenuAction,
  setConfigureTourMenuCancel,
  setConfigureTourMenuConfirm,
} from '../../../../redux/slice/menuSlice';
import {
  CONFIGURE_TOUR_MENU_OPTIONS,
  CONFIGURE_TOUR_MODAL_OPTIONS,
} from '../../../../util/configureTourUtils';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from 'react-bootstrap';

export default function ConfigureToursOptions() {
  const { visible, action } = useSelector(
    (state) => state.menu.configureTourMenu
  );

  const dispatch = useDispatch();
  const [configureTourMenuOption, setConfigureTourMenuOption] = useState(
    Object.keys(CONFIGURE_TOUR_MENU_OPTIONS)[0]
  );

  return (
    <>
      <Modal isOpen={visible}>
        <ModalHeader
          toggle={function noRefCheck() {
            dispatch(setConfigureTourMenuCancel(true));
          }}
        >
          Configure Tours
        </ModalHeader>
        <div
          className="d-flex justify-content-center p-5"
          style={{ zIndex: '1000000' }}
        >
          <FormGroup>
            <Label for="exampleSelect">Select your Options</Label>
            <Input
              onChange={(e) => {
                setConfigureTourMenuOption(e.target.value);
              }}
              defaultValue={configureTourMenuOption}
              type="select"
              name="select"
              id="exampleSelect"
              style={{ cursor: 'pointer' }}
            >
              {Object.keys(CONFIGURE_TOUR_MENU_OPTIONS).length &&
                Object.keys(CONFIGURE_TOUR_MENU_OPTIONS).map(
                  (configureTourMenuOption) => {
                    return (
                      <option
                        style={{ cursor: 'pointer' }}
                        value={
                          CONFIGURE_TOUR_MENU_OPTIONS[configureTourMenuOption]
                            .action
                        }
                      >
                        {
                          CONFIGURE_TOUR_MENU_OPTIONS[configureTourMenuOption]
                            .title
                        }
                      </option>
                    );
                  }
                )}
            </Input>
          </FormGroup>
        </div>
        <ModalFooter>
          <Button
            onClick={function noRefCheck() {
              dispatch(setConfigureTourMenuCancel(true));
            }}
          >
            Cancel
          </Button>{' '}
          <Button
            color="primary"
            onClick={function noRefCheck() {
              dispatch(setConfigureTourMenuAction(configureTourMenuOption));
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
