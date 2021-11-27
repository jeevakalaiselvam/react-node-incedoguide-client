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
  actionConfigureGuidesAddStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_ADD_STEP_INSERTION_POINT,
  CG_ADD_STEP_START,
} from '../../../menuconstants/CG_AddStep';
import { FormGroup, Label } from 'reactstrap';

export default function ASEG_1_Start() {
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { configureGuidesAddStepsState } = menu;
  const dispatch = useDispatch();
  const [selectedGuideId, setSelectedGuideId] = useState(guides[0].guideId);
  let selectedGuide = {};

  const guideIdSelectHandler = (e) => {
    console.log(e.target.value);
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
          configureGuidesAddStepsState.currentAction === CG_ADD_STEP_START
        }
      >
        <ModalHeader
          toggle={() => {
            dispatch(actionMenuOption(''));
            dispatch(
              actionConfigureGuidesAddStepsCurrentAction({ action: '' })
            );
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Add Steps to Existing
        </ModalHeader>
        <ModalBody>
          {guides.length && (
            <FormGroup>
              <Label for="exampleSelect">Select the Guide</Label>
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
          {!guides.length && <h1>No Guide Present</h1>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                actionConfigureGuidesAddStepsCurrentAction({
                  action: CG_ADD_STEP_INSERTION_POINT,
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
                actionConfigureGuidesAddStepsCurrentAction({ action: '' })
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
