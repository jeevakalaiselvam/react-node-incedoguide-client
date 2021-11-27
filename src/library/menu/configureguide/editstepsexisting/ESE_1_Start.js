import React, { useEffect, useState } from 'react';
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
  actionConfigureGuidesEditStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import { FormGroup, Label } from 'reactstrap';
import {
  CG_EDIT_STEP_EDIT_DETAILS,
  CG_EDIT_STEP_START,
} from '../../../menuconstants/CG_EditStep';

export default function ESE_1_Start() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { configureGuidesEditStepsState } = menu;
  const dispatch = useDispatch();
  const [selectedGuideId, setSelectedGuideId] = useState(guides[0].guideId);
  let selectedGuide = {};

  const guideIdSelectHandler = (e) => {
    e.persist();
    setSelectedGuideId((old) => e.target.value);
  };

  useEffect(() => {
    selectedGuide = guides.find((guide) => guide.guideId == selectedGuideId);
  }, [selectedGuideId]);

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesEditStepsState.currentAction === CG_EDIT_STEP_START
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionConfigureGuidesEditStepsCurrentAction({ action: '' })
            );
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Edit Steps of Existing
        </ModalHeader>
        <ModalBody>
          {guides.length && (
            <FormGroup>
              <Label for="exampleSelect">Select the Tour</Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                value={selectedGuideId}
                onChange={guideIdSelectHandler}
              >
                {guides.map(({ title, guideId }) => {
                  return (
                    <option key={guideId} value={guideId}>
                      {title}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          )}
          {!guides.length && <h1>No Tours Present</h1>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                actionConfigureGuidesEditStepsCurrentAction({
                  action: CG_EDIT_STEP_EDIT_DETAILS,
                  data: {
                    guideId: selectedGuideId,
                    oldGuide: selectedGuide,
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
                actionConfigureGuidesEditStepsCurrentAction({ action: '' })
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
