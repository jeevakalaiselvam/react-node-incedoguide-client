import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Dropdown } from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  MAIN_MENU_OPTIONS,
  MENU_TOGGLE_CLOSE,
  MENU_TOGGLE_OPEN,
} from './menuconstants/mainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import ConfigureGuides from './menu/ConfigureGuides';
import { actionMenuOption, actionMenuToggle } from './redux/slice/menuSlice';
import GuideItem from './uicomponents/GuideItem';
export default function Menu() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { menuToggle } = menu;
  const { projectDetails } = user;
  const { roleType } = projectDetails;
  const { guides } = project;

  return (
    <>
      <Dropdown
        toggle={() => {
          menuToggle === MENU_TOGGLE_OPEN
            ? dispatch(actionMenuToggle(MENU_TOGGLE_CLOSE))
            : dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
        }}
        isOpen={menuToggle === MENU_TOGGLE_OPEN}
      >
        <DropdownToggle color="none">
          <img
            src="https://img.icons8.com/dusk/64/000000/compass--v2.png"
            className="incedo-menu-icon"
            alt="Guide Icon"
            style={{ width: '50px', height: '50px' }}
          />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Menu Options</DropdownItem>
          {roleType &&
            MAIN_MENU_OPTIONS[roleType].map(({ title, action }) => {
              return (
                <DropdownItem
                  key={title}
                  onClick={() => {
                    dispatch(actionMenuOption(action));
                    dispatch(actionMenuToggle(MENU_TOGGLE_CLOSE));
                  }}
                >
                  {title}
                </DropdownItem>
              );
            })}
          {guides.length !== 0 && (
            <DropdownItem header>Guides Available</DropdownItem>
          )}
          {guides.map((guide) => {
            return (
              <DropdownItem key={guide.guideId} key={guide.guideId}>
                <GuideItem title={guide.title} guideId={guide.guideId} />
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      {/* Render the Selected Menu Option */}
      <ConfigureGuides />
    </>
  );
}
