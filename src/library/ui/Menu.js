import React from 'react';
import { Dropdown } from 'reactstrap';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateMenuForRoleType } from '../util/menuUtils';
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';

export default function Menu({
  menuToggleHandler,
  roleType = 'TOURME_USER',
  menuToggle,
}) {
  const menuItems = generateMenuForRoleType(roleType);

  return (
    <UncontrolledDropdown inNavbar>
      <DropdownToggle nav>
        <FontAwesomeIcon icon={faQuestion} />
      </DropdownToggle>
      <DropdownMenu right>
        {menuItems &&
          menuItems.map((menuItem) => (
            <DropdownItem key={menuItem.action}>{menuItem.title}</DropdownItem>
          ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
