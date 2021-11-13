import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateMenuForRoles } from '../util/menuUtils';

export default function Menu({ menuToggleHandler, roleList }) {
  const menuItems = generateMenuForRoles(roleList);

  return (
    <Dropdown onToggle={(isOpen) => menuToggleHandler(isOpen)}>
      <Dropdown.Toggle variant="none" id="tourme-menu">
        <FontAwesomeIcon icon={faQuestion} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {menuItems &&
          menuItems.map((menuItem) => (
            <Dropdown.Item key={menuItem.action}>
              {menuItem.title}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
