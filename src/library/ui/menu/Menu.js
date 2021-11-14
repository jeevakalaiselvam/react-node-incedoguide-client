import React from 'react';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ALL_MENU_ITEMS, generateMenuForRoleType } from '../../util/menuUtils';
import { CONFIGURE_TOUR_MODAL_OPTIONS } from '../../util/configureTourUtils';
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import ConfigureTours from './configuretours/ConfigureTours';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuAction, setMenuVisible } from '../../redux/slice/menuSlice';

export default function Menu({ roleType = 'TOURME_USER' }) {
  const menuItems = generateMenuForRoleType(roleType);

  const { visible, action } = useSelector((state) => {
    return state.menu;
  });
  const dispatch = useDispatch();

  return (
    <>
      <UncontrolledDropdown isOpen={visible}>
        <DropdownToggle
          onClick={() => {
            dispatch(setMenuVisible(!visible));
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
                  setMenuVisible((_) => false);
                  dispatch(setMenuAction(menuItem.action));
                }}
              >
                {menuItem.title}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>

      {action === ALL_MENU_ITEMS.TOUR_CONFIGURATION.action && (
        <ConfigureTours />
      )}
      {action === ALL_MENU_ITEMS.TOUR_VISIBILITY.action && <ConfigureTours />}
      {action === ALL_MENU_ITEMS.PROVIDE_FEEDBACK.action && <ConfigureTours />}
    </>
  );
}
