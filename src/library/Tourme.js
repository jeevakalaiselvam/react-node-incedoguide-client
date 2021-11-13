import React, { useState, useEffect } from 'react';
import { fetchProjectDetails, onboardProject } from './api/projectAPI';
import { fetchUserDetails } from './api/userAPI';
import Menu from './ui/Menu';
import { TOURME_ROLES } from './util/tourmeRoles';
import Joyride from 'react-joyride';
import unique from 'unique-selector';

export default function Tourme({
  userId,
  environment = 'LOCAL',
  projectName,
  fullName,
  emailId,
}) {
  const [menuToggle, setMenuToggle] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [projectOnboarded, setProjectOnboarded] = useState(false);
  const [userRoleType, setUserRoleType] = useState(TOURME_ROLES.TOURME_USER);
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([
    {
      target: '#page1',
      content: 'This is Page1',
    },
  ]);
  const [makeToursVisible, setMakeToursVisible] = useState(true);
  const [startDOMSelect, setStartDOMSelect] = useState(true);

  const menuToggleHandler = (isMenuOpen) => {
    setMenuToggle((_MenuState) => isMenuOpen);
  };

  //Load UserDetails or OnboardUser if First time
  useEffect(() => {
    const getTourmeUserDetails = async () => {
      const userDetails = await fetchUserDetails({ userId }, environment);
      //If User Details are present
      if (userDetails) {
        const { userId, emailId, fullName } = userDetails;
        setUserDetails((_) => ({
          userId,
          emailId,
          fullName,
        }));
        setProjectOnboarded((_) => true);
      } else {
        //If user is not present, Onboard the current Project
        const onboardCompleted = await onboardProject(
          {
            userId,
            emailId,
            fullName,
            projectName,
            roleType: TOURME_ROLES.TOURME_ADMIN,
          },
          environment
        );

        if (onboardCompleted) {
          //Set Onboarding is complete for current project
          setProjectOnboarded((_) => true);
        }
      }
      const { roleType } = await fetchProjectDetails(
        { userId, projectName },
        environment
      );
      setUserRoleType((_) => roleType);
    };
    getTourmeUserDetails();
  }, []);

  //Handle Side Effect when Menu is Toggled
  useEffect(() => {}, [menuToggle]);

  //Handle Joyride Callback
  const handleJoyrideCallback = () => {};

  const getHelpers = () => {};

  //DOM Highlight
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (startDOMSelect) {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
          element.addEventListener(
            'click',
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(unique(e.target));
            },
            true
          );
          element.addEventListener(
            'mouseenter',
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              const elementInner = e.target;
              elementInner.style.border = '1px solid red';
            },
            true
          );
          element.addEventListener(
            'mouseleave',
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              const elementInner = e.target;
              elementInner.style.border = 'none';
            },
            true
          );
        });
      }
    }
  }, [startDOMSelect]);

  return (
    <div>
      <Menu menuToggleHandler={menuToggleHandler} roleType={userRoleType} />
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
    </div>
  );
}
