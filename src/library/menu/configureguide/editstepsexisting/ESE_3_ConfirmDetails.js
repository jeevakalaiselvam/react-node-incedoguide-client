import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  Table,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionConfigureGuidesAddStepsCurrentAction,
  actionConfigureGuidesEditStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import { FormGroup, Label } from 'reactstrap';
import {
  CG_EDIT_STEP_EDIT_CONFIRM,
  CG_EDIT_STEP_EDIT_DETAILS,
  CG_EDIT_STEP_START,
} from '../../../menuconstants/CG_EditStep';
import { apiUpdateGuide } from '../../../redux/slice/projectSlice';

export default function ESE_3_ConfirmDetails() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides, currentEnvironment } = project;
  const { configureGuidesEditStepsState } = menu;
  const { oldGuide, newGuide } = configureGuidesEditStepsState;
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        toggle={function noRefCheck() {}}
        isOpen={
          configureGuidesEditStepsState.currentAction ===
          CG_EDIT_STEP_EDIT_CONFIRM
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
          Confirm Edited Details
        </ModalHeader>
        <ModalBody>
          {newGuide.steps.length !== 0 && (
            <>
              {newGuide.steps.map((step, index) => {
                const oldTitle = oldGuide.steps[index].title;
                const newTitle = newGuide.steps[index].title;
                const oldContent = oldGuide.steps[index].content;
                const newContent = newGuide.steps[index].content;

                return (
                  <div key={index}>
                    {(oldTitle !== newTitle || oldContent !== newContent) && (
                      <h4>Step {index + 1}</h4>
                    )}
                    {oldTitle !== newTitle && (
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>Old Title</th>
                            <th>New Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{oldTitle}</td>
                            <td>{newTitle}</td>
                          </tr>
                        </tbody>
                      </Table>
                    )}
                    {oldContent !== newContent && (
                      <Table key={index}>
                        <thead>
                          <tr>
                            <th>Old Content</th>
                            <th>New Content</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{oldContent}</td>
                            <td>{newContent}</td>
                          </tr>
                        </tbody>
                      </Table>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {newGuide.steps.length === 0 && <h2>All Steps Removed </h2>}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                apiUpdateGuide({
                  guide: newGuide,
                  currentEnvironment,
                })
              );
              dispatch(
                actionConfigureGuidesEditStepsCurrentAction({
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
