import React, { useState, useEffect } from 'react';
import { fetchProjectDetails, onboardProject } from './api/projectAPI';
import { fetchUserDetails } from './api/userAPI';
import Menu from './ui/Menu';
import { TOURME_ROLES } from './util/tourmeRoles';
import Joyride from 'react-joyride';
import { handleDOMSelect } from './util/handleDOMSelect';
import { getTourmeUserDetails } from './effects/menuEffects';
import ConfigureTours from './ui/ConfigureTours';

export default function Tourme({
  userId,
  environment = 'LOCAL',
  projectName,
  fullName,
  emailId,
}) {
  //All State Information
  const [menuToggle, setMenuToggle] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [projectOnboarded, setProjectOnboarded] = useState(false);
  const [userRoleType, setUserRoleType] = useState(TOURME_ROLES.TOURME_USER);
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);
  const [makeToursVisible, setMakeToursVisible] = useState(true);
  const [startDOMSelect, setStartDOMSelect] = useState(false);
  const [specialModifierPressed, setSpecialModifierPressed] = useState(false);
  const [configurationPanelVisibile, setConfigurationPanelVisible] =
    useState(true);

  const menuToggleHandler = (isMenuOpen) => {
    setMenuToggle((_) => isMenuOpen);
  };

  //Load UserDetails or OnboardUser if First time
  useEffect(() => {
    getTourmeUserDetails(
      { userId, emailId, fullName, projectName, environment },
      setUserDetails,
      setProjectOnboarded,
      setUserRoleType
    );
  }, []);

  //Handle Side Effect when Menu is Toggled
  useEffect(() => {}, [menuToggle]);

  //Handle Joyride Callback
  const handleJoyrideCallback = () => {};

  const getHelpers = () => {};

  //Start DOM Select
  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleDOMSelect(document, specialModifierPressed, startDOMSelect);
    }
  }, [startDOMSelect]);

  return (
    <div>
      <Menu
        menuToggleHandler={menuToggleHandler}
        roleType={userRoleType}
        menuToggle={menuToggle}
      />
      {makeToursVisible && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous={true}
          getHelpers={getHelpers}
          run={run}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
      )}
      {/* Setup all Panel Modal Visibility */}
      {/* {configurationPanelVisibile && <ConfigureTours />} */}
    </div>
  );
}
