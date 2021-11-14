import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CONFIGURE_TOUR_MODAL_OPTIONS } from '../util/modalUtils';

export default function ConfigureTours() {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    CONFIGURE_TOUR_MODAL_OPTIONS.ADD_NEW_TOUR
  );

  return (
    <Modal modalVisible>
      <ModalHeader
        toggle={function noRefCheck() {
          console.log('Cross clicked!');
        }}
      >
        Configure Tours
      </ModalHeader>
      <ModalBody>Setup your tours here!</ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={function noRefCheck() {
            setModalVisible((_) => false);
          }}
        >
          Submit
        </Button>{' '}
        <Button
          onClick={function noRefCheck() {
            setModalVisible((_) => false);
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
