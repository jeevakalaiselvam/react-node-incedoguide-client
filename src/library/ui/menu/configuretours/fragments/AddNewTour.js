import React, { useEffect, useRef, useState } from 'react';
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
  setAddNewTourEditActionConfirm,
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
  const tourNameRef = useRef(null);
  const stepNameRef = useRef(null);
  const stepDescriptionRef = useRef(null);

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
                const name = e.target.value;
                setTourName((old) => name);
              }}
              value={tourName}
            />
          </InputGroup>
          <InputGroup className="p-2">
            <InputGroupText>Step Name</InputGroupText>
            <Input
              onChange={(e) => {
                const stepName = e.target.value;
                setStepName((old) => stepName);
              }}
              value={stepName}
            />
          </InputGroup>
          <InputGroup className="p-2">
            <InputGroupText>Step Description</InputGroupText>
            <Input
              onChange={(e) => {
                const stepDesc = e.target.value;
                setStepDescription((old) => stepDesc);
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
                  setAddNewTourEditActionConfirm({
                    tourName,
                    stepName,
                    stepDescription,
                  })
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
