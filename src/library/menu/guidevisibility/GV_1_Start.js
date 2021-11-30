import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { GV_SETUP_START } from '../../menuconstants/guideVisibility';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import {
  actionConfigureGuidesNewCurrentAction,
  actionGuideVisibilityCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../redux/slice/menuSlice';

export default function GV_1_Start() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { guideVisibility } = menu;
  const { projectDetails } = user;
  const { projectRoles } = projectDetails;
  const [guideSelected, setGuideSelected] = useState(0);
  const [rolesInGuides, setRolesInGuides] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (guides.length !== 0) {
      setGuideSelected((old) => guides[0].guideId);
      let mapRolesInGuides = {};
      guides.forEach((guide) => {
        mapRolesInGuides = {
          ...mapRolesInGuides,
          [+guide.guideId]: guide.roleVisibility,
        };
      });
      setRolesInGuides((old) => mapRolesInGuides);
    }
  }, [guides]);

  const guideSelectionHandler = (e) => {
    e.persist();
    setGuideSelected(+e.target.value);
  };

  const checkboxChangedHandler = (roleKey) => {
    console.log(roleKey);
  };

  return (
    <Modal
      toggle={function noRefCheck() {}}
      isOpen={guideVisibility.currentAction === GV_SETUP_START}
    >
      <ModalHeader
        toggle={() => {
          dispatch(actionMenuOption(''));
          dispatch(actionGuideVisibilityCurrentAction({ action: '' }));
          dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
        }}
      >
        Setup Guide Visibility
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="guideSelected">Select Guide</Label>
          <Input
            id="guideSelected"
            name="guideSelected"
            type="select"
            value={guideSelected}
            onChange={guideSelectionHandler}
          >
            {guides &&
              guides.length !== 0 &&
              guides.map((guide) => {
                return (
                  <option key={guide.guideId} value={guide.guideId}>
                    {guide.title}
                  </option>
                );
              })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="guideSelected">Choose Roles</Label>
          <br />
          {projectRoles &&
            rolesInGuides &&
            Object.keys(projectRoles).length !== 0 &&
            Object.keys(rolesInGuides).length !== 0 &&
            Object.keys(projectRoles).map((roleKey) => {
              return (
                <FormGroup check inline key={roleKey}>
                  {roleKey !== MAIN_ADMIN && (
                    <React.Fragment>
                      <Input
                        type="checkbox"
                        onChange={() => checkboxChangedHandler(roleKey)}
                        checked={rolesInGuides[guideSelected].includes(roleKey)}
                      />
                      <Label check>{roleKey}</Label>
                    </React.Fragment>
                  )}
                </FormGroup>
              );
            })}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={function noRefCheck() {}}>
          UPDATE
        </Button>{' '}
        <Button
          onClick={() => {
            dispatch(actionMenuOption(''));
            dispatch(actionGuideVisibilityCurrentAction({ action: '' }));
            dispatch(actionMenuToggle(MENU_TOGGLE_OPEN));
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
