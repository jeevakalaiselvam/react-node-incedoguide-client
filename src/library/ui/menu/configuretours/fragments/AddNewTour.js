import React from 'react';
import {
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup } from 'react-bootstrap';
import { ADD_NEW_TOUR_ACTIONS } from '../../../../util/addTourActions';
import {
  setAddNewTourAction,
  setAddNewTourCancel,
} from '../../../../redux/slice/menuSlice';

export default function AddNewTour() {
  const { visible, currentAction } = useSelector(
    (state) => state.menu.configureTourMenu.addTour
  );

  const dispatch = useDispatch();

  return (
    <>
      <Modal isOpen={visible}>
        <ModalHeader
          toggle={function noRefCheck() {
            dispatch(setAddNewTourCancel(true));
          }}
        >
          Select a Target
        </ModalHeader>

        <ModalFooter>
          <Button
            onClick={function noRefCheck() {
              dispatch(setAddNewTourCancel(true));
            }}
          >
            Cancel
          </Button>{' '}
          <Button
            color="primary"
            onClick={function noRefCheck() {
              dispatch(setAddNewTourAction(ADD_NEW_TOUR_ACTIONS.SELECTING_DOM));
            }}
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
      {currentAction === ADD_NEW_TOUR_ACTIONS.SELECTING_DOM &&
        console.log('Starting DOM Selection')}
    </>
  );
}
