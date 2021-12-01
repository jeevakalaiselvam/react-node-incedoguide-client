import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesDeleteGuidesCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import { FormGroup, Label } from 'reactstrap';
import {
  CG_DELETE_GUIDE_CONFIRM,
  CG_DELETE_GUIDE_START,
} from '../../../menuconstants/CG_DeleteGuide';

export default function DG_1_Start() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { configureGuidesDeleteGuidesState } = menu;
  const dispatch = useDispatch();
  const [guideIdsToDelete, setGuideIdsToDelete] = useState([]);

  const addGuideToDelete = (guideId) => {
    if (guideIdsToDelete.find((id) => id === guideId)) {
      let newGuideIds = [];
      newGuideIds = guideIdsToDelete.filter((id) => {
        return id !== guideId;
      });
      setGuideIdsToDelete((old) => {
        return newGuideIds;
      });
    } else {
      let newGuideIds = guideIdsToDelete;
      newGuideIds.push(guideId);
      setGuideIdsToDelete((old) => {
        return newGuideIds;
      });
    }
  };

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesDeleteGuidesState.currentAction ===
          CG_DELETE_GUIDE_START
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionConfigureGuidesDeleteGuidesCurrentAction({ action: '' })
            );
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Delete Guides
        </ModalHeader>
        <ModalBody>
          {guides.length !== 0 &&
            guides.map(({ guideId, title }) => {
              return (
                <FormGroup check inline key={guideId}>
                  <Input
                    type="checkbox"
                    checked={guideIdsToDelete.find((id) => id === guideId)}
                    onChange={() => {
                      addGuideToDelete(guideId);
                    }}
                  />
                  <Label check>{title}</Label>
                </FormGroup>
              );
            })}
          {guides.length === 0 && <h1>No Guide Present</h1>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                actionConfigureGuidesDeleteGuidesCurrentAction({
                  action: CG_DELETE_GUIDE_CONFIRM,
                  data: {
                    guideIdsToDelete: guideIdsToDelete,
                  },
                })
              );
            }}
          >
            CONFIRM
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch(actionMenuOption(''));
              dispatch(
                actionConfigureGuidesDeleteGuidesCurrentAction({ action: '' })
              );
              dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
