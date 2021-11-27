import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
  Badge,
  Tooltip,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CG_NEW_DOM_SELECT, CG_NEW_START } from '../../../menuconstants/CG_New';
import {
  actionConfigureGuidesNewCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../../redux/slice/menuSlice';
import { MENU_TOGGLE_OPEN } from '../../../menuconstants/mainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpellCheck,
  faQuestion,
  faChair,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function ANG_1_Start() {
  const menu = useSelector((state) => state.menu);
  const { configureGuidesNewState } = menu;
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={
          configureGuidesNewState.currentAction === CG_NEW_START
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
              actionConfigureGuidesNewCurrentAction({
                action: CG_NEW_DOM_SELECT,
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
