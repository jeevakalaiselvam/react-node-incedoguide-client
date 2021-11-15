import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MENU_CLOSE, MENU_OPEN } from '../redux/slice/menuSlice';
import { MAIN_MENU_OPTIONS_FOR_ROLE } from '../constants/menuConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { menuOpen } = menu;
  const { userDetails, projectDetails } = user;
  const { userId, fullName, emailId } = userDetails;
  const { projectId, projectName, userRole } = projectDetails;
  console.log(menuOpen);

  return (
    <Dropdown
      toggle={() => {
        menuOpen ? dispatch(MENU_OPEN(false)) : dispatch(MENU_OPEN(true));
      }}
      isOpen={menuOpen}
    >
      <DropdownToggle color="none">
        <FontAwesomeIcon icon={faQuestion} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Select Options</DropdownItem>
        {MAIN_MENU_OPTIONS_FOR_ROLE[userRole].map(({ title, action }) => {
          return <DropdownItem key={title}>{title}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
