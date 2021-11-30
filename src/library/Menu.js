import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Dropdown } from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  ADMIN_USER,
  MAIN_ADMIN,
  MAIN_MENU_OPTIONS,
  MENU_TOGGLE_CLOSE,
  MENU_TOGGLE_OPEN,
  NORMAL_USER,
} from './menuconstants/mainMenu';
import ConfigureGuides from './menu/ConfigureGuides';
import { actionMenuOption, actionMenuToggle } from './redux/slice/menuSlice';
import GuideItem from './uicomponents/GuideItem';
import SetupRoles from './menu/SetupRoles';
import { checkIfGuideShouldBeVisibleToUser } from '../helper/util';
export default function Menu() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { menuToggle } = menu;
  const { projectDetails, userDetails } = user;
  const { projectRoles, userId } = projectDetails;
  const { currentUserId, currentUserRoles } = userDetails;
  const { guides } = project;

  const isUserAdmin =
    projectRoles && projectRoles[MAIN_ADMIN].includes(currentUserId);

  return (
    <React.Fragment>
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
        <DropdownMenu style={{ minWidth: '225px' }}>
          {isUserAdmin ? (
            +currentUserId === +userId ? (
              <Badge color="danger">PROJECT ADMIN</Badge>
            ) : (
              <Badge color="warning">ADMIN</Badge>
            )
          ) : (
            <Badge color="primary">USER</Badge>
          )}
          <DropdownItem header>Menu Options</DropdownItem>
          {/* Render all Admin Menu Options */}
          {isUserAdmin &&
            MAIN_MENU_OPTIONS[ADMIN_USER].map(({ title, action }) => {
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
          {/* Render all Non Admin Menu Options */}
          {!isUserAdmin &&
            MAIN_MENU_OPTIONS[NORMAL_USER].map(({ title, action }) => {
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
          {/* Render all Guides if User is Admin */}
          {isUserAdmin &&
            guides.map((guide) => {
              return (
                <DropdownItem key={guide.guideId}>
                  <GuideItem title={guide.title} guideId={guide.guideId} />
                </DropdownItem>
              );
            })}
          {/* If User is not ADMIN, Render Guides only based on current Role */}
          {!isUserAdmin &&
            guides.map((guide) => {
              if (
                checkIfGuideShouldBeVisibleToUser(
                  guide.roleVisibility,
                  currentUserRoles
                )
              ) {
                return (
                  <DropdownItem key={guide.guideId}>
                    <GuideItem title={guide.title} guideId={guide.guideId} />
                  </DropdownItem>
                );
              } else {
                return null;
              }
            })}
        </DropdownMenu>
      </Dropdown>
      {/* Render the Selected Menu Option */}
      <ConfigureGuides />
      <SetupRoles />
    </React.Fragment>
  );
}
