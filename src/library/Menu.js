import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  actionMainMenuSelect,
  actionMenuToggle,
} from './redux/slice/menuSlice';
import { CONFIGURE_TOURS, MAIN_MENU_OPTIONS } from './constants/menuConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ConfigureTours from './menu/ConfigureTours';

export default function Menu() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { menuOpen, menuSelected } = menu;
  const { userDetails, projectDetails } = user;
  const { userId, fullName, emailId } = userDetails;
  const { projectId, projectName, userRole } = projectDetails;

  return (
    <>
      <Dropdown
        toggle={() => {
          menuOpen
            ? dispatch(actionMenuToggle(false))
            : dispatch(actionMenuToggle(true));
        }}
        isOpen={menuOpen}
      >
        <DropdownToggle color="none">
          <FontAwesomeIcon icon={faQuestion} />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Select Options</DropdownItem>
          {MAIN_MENU_OPTIONS[userRole].map(({ title, action }) => {
            return (
              <DropdownItem
                key={title}
                onClick={() => dispatch(actionMainMenuSelect(action))}
              >
                {title}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      {menuSelected === CONFIGURE_TOURS && <ConfigureTours />}
    </>
  );
}
