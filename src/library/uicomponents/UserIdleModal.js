import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { actionSetUserIdle } from '../redux/slice/projectSlice';
import { actionMenuToggle } from '../redux/slice/menuSlice';
import { MENU_TOGGLE_CLOSE, MENU_TOGGLE_OPEN } from '../menuconstants/mainMenu';

export default function UserIdleModal() {
  const dispatch = useDispatch();

  return (
    <Modal toggle={function noRefCheck() {}} isOpen={true}>
      <ModalHeader
        toggle={() => {
          dispatch(actionSetUserIdle(false));
          dispatch(actionMenuToggle(MENU_TOGGLE_CLOSE));
        }}
      >
        Need some help ?
      </ModalHeader>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            dispatch(actionSetUserIdle(false));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          YES 😅
        </Button>{' '}
        <Button
          onClick={() => {
            dispatch(actionSetUserIdle(false));
            dispatch(actionMenuToggle(MENU_TOGGLE_CLOSE));
          }}
        >
          NO{' '}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
