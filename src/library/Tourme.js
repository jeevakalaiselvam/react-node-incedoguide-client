import React, { useState, useEffect } from 'react';
import { fetchProjectDetails, onboardProject } from './api/projectAPI';
import { fetchUserDetails } from './api/userAPI';
import Menu from './ui/Menu';
import { TOURME_ROLES } from './util/tourmeRoles';
import Joyride from 'react-joyride';
import { handleDOMSelect } from './util/handleDOMSelect';
import { getTourmeUserDetails } from './effects/menuEffects';
import ConfigureTours from './ui/ConfigureTours';
import { ALL_MENU_ITEMS } from './util/menuUtils';
import { store } from './app/store';
import { Provider } from 'react-redux';

export default function Tourme({
  userId,
  environment = 'LOCAL',
  projectName,
  fullName,
  emailId,
}) {
  //All State Information
  const [userDetails, setUserDetails] = useState({});
  const [projectOnboarded, setProjectOnboarded] = useState(false);
  const [userRoleType, setUserRoleType] = useState(TOURME_ROLES.TOURME_USER);
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);
  const [makeToursVisible, setMakeToursVisible] = useState(true);
  const [startDOMSelect, setStartDOMSelect] = useState(false);
  const [specialModifierPressed, setSpecialModifierPressed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

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
  useEffect(() => {}, [menuVisible]);

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
    <Provider store={store}>
      <Menu
        roleType={userRoleType}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
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
    </Provider>
  );
}
