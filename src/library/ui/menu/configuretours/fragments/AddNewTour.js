import React, { useEffect, useState } from 'react';
import {
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup } from 'react-bootstrap';
import {
  setAddNewTourAction,
  setAddNewTourCancel,
  setAddNewTourEditActionCancel,
  setStartingDomSelection,
} from '../../../../redux/slice/menuSlice';
import { ADD_NEW_TOUR_ACTIONS } from '../../../../util/addTourActions';
import { handleDOMSelect } from '../../../../util/handleDOMSelect';

export default function AddNewTour() {
  const { visible, currentAction } = useSelector(
    (state) => state.menu.configureTourMenu.addTour
  );

  const [tourName, setTourName] = useState('');
  const [stepName, setStepName] = useState('');
  const [stepDescription, setStepDescription] = useState('');
  const [mediaType, setMediaType] = useState('none');
  const [mediaUrl, setMediaUrl] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentAction === ADD_NEW_TOUR_ACTIONS.SELECTING_DOM) {
      dispatch(setStartingDomSelection(true));
      if (typeof window !== undefined) {
        handleDOMSelect(document, true, dispatch);
      }
    }

    if (currentAction === ADD_NEW_TOUR_ACTIONS.EDIT_TOUR_DETAILS) {
      console.log('Started Editing');
    }
  }, [currentAction]);

  return (
    <>
      {currentAction === ADD_NEW_TOUR_ACTIONS.SELECTING_DOM && (
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
                dispatch(
                  setAddNewTourAction(ADD_NEW_TOUR_ACTIONS.SELECTING_DOM)
                );
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {currentAction === ADD_NEW_TOUR_ACTIONS.EDIT_TOUR_DETAILS && (
        <Modal isOpen={visible}>
          <ModalHeader
            toggle={function noRefCheck() {
              dispatch(setAddNewTourCancel(true));
            }}
          >
            Add Tour Details
          </ModalHeader>
          <InputGroup className="p-2">
            <InputGroupText>Tour Name</InputGroupText>
            <Input
              onChange={(e) => {
                setTourName((_) => e.target.value);
              }}
              value={tourName}
            />
          </InputGroup>
          <InputGroup className="p-2">
            <InputGroupText>Step Name</InputGroupText>
            <Input
              onChange={(e) => {
                setStepName((_) => e.target.value);
              }}
              value={stepName}
            />
          </InputGroup>
          <InputGroup className="p-2">
            <InputGroupText>Step Description</InputGroupText>
            <Input
              onChange={(e) => {
                setStepDescription((_) => e.target.value);
              }}
              value={stepDescription}
            />
          </InputGroup>
          <br />

          <ModalFooter>
            <Button
              onClick={function noRefCheck() {
                dispatch(setAddNewTourEditActionCancel(true));
              }}
            >
              Cancel
            </Button>{' '}
            <Button
              color="primary"
              onClick={function noRefCheck() {
                dispatch(
                  setAddNewTourAction(ADD_NEW_TOUR_ACTIONS.SELECTING_DOM)
                );
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
