import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesDeleteGuidesCurrentAction,
  actionConfigureGuidesReorderStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_REORDER_STEP_CHANGE_ORDER,
  CG_REORDER_STEP_START,
} from '../../../menuconstants/CG_ReorderStep';
import { FormGroup, Label, Card } from 'reactstrap';
import {
  CG_EDIT_STEP_EDIT_DETAILS,
  CG_EDIT_STEP_START,
} from '../../../menuconstants/CG_EditStep';
import {
  CG_DELETE_GUIDE_CONFIRM,
  CG_DELETE_GUIDE_START,
} from '../../../menuconstants/CG_DeleteGuide';
import {
  apiUpdateGuide,
  apiDeleteGuides,
} from '../../../redux/slice/projectSlice';

export default function DG_2_Confirm() {
  const user = useSelector((state) => state.user);
  const { projectDetails } = user;
  const { projectId } = projectDetails;
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides, currentEnvironment } = project;
  const { configureGuidesDeleteGuidesState } = menu;
  const { guideIdsToDelete } = configureGuidesDeleteGuidesState;
  const generatedGuides = {};
  const dispatch = useDispatch();
  guides.forEach((guide) => {
    if (guideIdsToDelete.includes(guide.guideId)) {
      generatedGuides[guide.guideId] = guide;
    }
  });

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesDeleteGuidesState.currentAction ===
          CG_DELETE_GUIDE_CONFIRM
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
          Confirm Guides to Delete
        </ModalHeader>
        <ModalBody>
          {Object.keys(generatedGuides).length !== 0 &&
            Object.keys(generatedGuides).map((key) => {
              return (
                <Card key={key} className="mt-2">
                  <CardBody>
                    <CardTitle tag="h5">{generatedGuides[key].title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Number of Steps - {generatedGuides[key].steps.length}
                    </CardSubtitle>
                  </CardBody>
                </Card>
              );
            })}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              //Dipatch action to delete the selected Guide IDS
              dispatch(
                apiDeleteGuides({
                  guideIdsToDelete,
                  projectId,
                  currentEnvironment,
                })
              );
              dispatch(
                actionConfigureGuidesDeleteGuidesCurrentAction({
                  action: '',
                })
              );
              dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
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
