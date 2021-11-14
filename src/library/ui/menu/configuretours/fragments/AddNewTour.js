import React, { useEffect } from 'react';
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
import { handleDOMSelect } from '../../../../util/handleDOMSelect';
import {
  setAddNewTourAction,
  setAddNewTourCancel,
  setStartingDomSelection,
} from '../../../../redux/slice/menuSlice';

export default function AddNewTour() {
  const { visible, currentAction } = useSelector(
    (state) => state.menu.configureTourMenu.addTour
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentAction === ADD_NEW_TOUR_ACTIONS.SELECTING_DOM) {
      dispatch(setStartingDomSelection(true));
      if (typeof window !== undefined) {
        handleDOMSelect(document, true, dispatch);
      }
    }
  }, [currentAction]);

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
    </>
  );
}
