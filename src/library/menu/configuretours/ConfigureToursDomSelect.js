import React from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button, Modal } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  CONFIGURE_TOURS,
  CONFIGURE_TOURS_DOM_SELECT,
} from '../../constants/menuConstants';
import {
  actionConfigureToursState,
  actionMainMenuSelect,
} from '../../redux/slice/menuSlice';

export default function ConfigureToursDomSelect() {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { menuSelected } = menu;

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={menuSelected === CONFIGURE_TOURS}
      >
        <ModalHeader
          toggle={function noRefCheck() {
            dispatch(actionMainMenuSelect(''));
          }}
        >
          Select an item in next step
        </ModalHeader>
        <ModalFooter>
          <Button
            onClick={function noRefCheck() {
              dispatch(actionMainMenuSelect(''));
            }}
          >
            ABORT
          </Button>
          <Button
            color="primary"
            onClick={function noRefCheck() {
              dispatch(actionConfigureToursState(CONFIGURE_TOURS_DOM_SELECT));
            }}
          >
            OK
          </Button>{' '}
        </ModalFooter>
      </Modal>
      {/* Configure Tour Options */}
    </>
  );
}
