import React, { useState } from 'react';
import { Dropdown } from 'reactstrap';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ALL_MENU_ITEMS, generateMenuForRoleType } from '../util/menuUtils';
import { CONFIGURE_TOUR_MODAL_OPTIONS } from '../util/modalUtils';
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import ConfigureTours from './ConfigureTours';

export default function Menu({
  roleType = 'TOURME_USER',
  menuVisible,
  setMenuVisible,
}) {
  const menuItems = generateMenuForRoleType(roleType);

  const [menuItemSelected, setMenuSelected] = useState(null);

  return (
    <>
      <UncontrolledDropdown isOpen={menuVisible}>
        <DropdownToggle
          onClick={() => {
            setMenuVisible((_) => !menuVisible);
          }}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </DropdownToggle>
        <DropdownMenu>
          {menuItems &&
            menuItems.map((menuItem) => (
              <DropdownItem
                key={menuItem.action}
                onClick={() => {
                  //setMenuItemSelected(menuItem.action);
                  setMenuVisible((_) => false);
                  setMenuSelected((_) => ALL_MENU_ITEMS[menuItem.action]);
                }}
              >
                {menuItem.title}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
      {/* Setup all Panel Modal Visibility */}
      {menuItemSelected === ALL_MENU_ITEMS.TOUR_CONFIGURATION.action && (
        <ConfigureTours />
      )}
    </>
  );
}
