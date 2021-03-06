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
import {
  GV_SETUP_CONFIRM,
  GV_SETUP_START,
} from '../../menuconstants/guideVisibility';
import { MAIN_ADMIN, MENU_TOGGLE_OPEN } from '../../menuconstants/mainMenu';
import {
  actionGuideVisibilityCurrentAction,
  actionMenuOption,
  actionMenuToggle,
} from '../../redux/slice/menuSlice';

export default function GV_1_Start() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const project = useSelector((state) => state.project);
  const { guides } = project;
  const { guideVisibilityState } = menu;
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
    if (rolesInGuides[guideSelected].includes(roleKey)) {
      let newRolesInGuides = [...rolesInGuides[guideSelected]];
      newRolesInGuides = rolesInGuides[guideSelected].filter(
        (role) => role !== roleKey
      );
      const newRolesInGuidesAltered = {
        ...rolesInGuides,
        [guideSelected]: newRolesInGuides,
      };
      setRolesInGuides((old) => newRolesInGuidesAltered);
    } else {
      let newRolesInGuides = [...rolesInGuides[guideSelected]];
      newRolesInGuides.push(roleKey);
      const newRolesInGuidesAltered = {
        ...rolesInGuides,
        [guideSelected]: newRolesInGuides,
      };
      setRolesInGuides((old) => newRolesInGuidesAltered);
    }
  };

  return (
    <Modal
      toggle={function noRefCheck() {}}
      isOpen={guideVisibilityState.currentAction === GV_SETUP_START}
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
        {guides && guides.length !== 0 && (
          <React.Fragment>
            <FormGroup>
              <Label for="guideSelected">Select Guide</Label>
              <Input
                id="guideSelected"
                name="guideSelected"
                type="select"
                value={guideSelected}
                onChange={guideSelectionHandler}
              >
                {guides.map((guide) => {
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
                            checked={rolesInGuides[guideSelected].includes(
                              roleKey
                            )}
                          />
                          <Label check>{roleKey}</Label>
                        </React.Fragment>
                      )}
                    </FormGroup>
                  );
                })}
            </FormGroup>
          </React.Fragment>
        )}
        {guides && guides.length === 0 && <h3>No Tours present</h3>}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            dispatch(
              actionGuideVisibilityCurrentAction({
                action: GV_SETUP_CONFIRM,
                data: {
                  rolesInGuides,
                },
              })
            );
          }}
        >
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
