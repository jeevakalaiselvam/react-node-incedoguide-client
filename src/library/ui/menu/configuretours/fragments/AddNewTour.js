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

export default function AddNewTour() {
  const dispatch = useDispatch();

  return (
    <>
      <Modal isOpen={true}>
        <ModalHeader toggle={function noRefCheck() {}}>
          Add New Tour
        </ModalHeader>

        <ModalFooter>
          <Button onClick={function noRefCheck() {}}>Cancel</Button>{' '}
          <Button color="primary" onClick={function noRefCheck() {}}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
