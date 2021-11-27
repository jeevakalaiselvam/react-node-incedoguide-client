import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CG_NEW_DOM_SELECT, CG_NEW_START } from '../../../menuconstants/CG_New';
import {
  actionConfigureGuidesAddStepsCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import {
  CG_ADD_STEP_CONFIRM_STEPS,
  CG_ADD_STEP_DOM_SELECT,
  CG_ADD_STEP_PROMPT,
} from '../../../menuconstants/CG_AddStep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ASEG_3_Prompt() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesAddStepsState } = menu;
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={
          configureGuidesAddStepsState.currentAction === CG_ADD_STEP_PROMPT
            ? 'incedo-guide-domselect-help-visible'
            : 'incedo-guide-domselect-help-invisible'
        }
      >
        <FontAwesomeIcon
          id="domSelectionIcon"
          className={'incedo-guide-domselect-icon'}
          icon={faCheck}
          onClick={() => {
            dispatch(
              actionConfigureGuidesAddStepsCurrentAction({
                action: CG_ADD_STEP_DOM_SELECT,
              })
            );
          }}
        />
        <Badge className="incedoguide-badge" color="primary">
          Click Icon to Start Selection
        </Badge>
      </div>
    </>
  );
}
