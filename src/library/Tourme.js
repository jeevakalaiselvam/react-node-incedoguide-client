import React, { useState, useEffect } from 'react';
import { onboardProject } from './api/projectAPI';
import { fetchTourmeUserDetails, getTourmeUserDetails } from './api/userAPI';
import Menu from './ui/Menu';
import { TOURME_ROLES } from './util/tourmeRoles';

export default function Tourme({
  userId,
  environment = 'LOCAL',
  apiVersion = 'v1',
  projectName,
  fullName,
  emailId,
}) {
  const [menuToggle, setMenuToggle] = useState(false);
  const [currentUser, setCurrentUserId] = useState({});
  const [currentEnvironment, setCurrentEnvironment] = useState(environment);
  const [currentUserRoles, setCurrentUserRoles] = useState(['TOURME_USER']);
  const [projectOnboarded, setProjectOnboarded] = useState(false);

  const menuToggleHandler = (isMenuOpen) => {
    setMenuToggle((oldMenuState) => isMenuOpen);
  };

  //Check if User is present in TourmeUsers
  useEffect(() => {
    const getTourmeUserDetails = async () => {
      const userDetails = await fetchTourmeUserDetails(
        userId,
        currentEnvironment
      );
      //If User Details are present
      if (userDetails) {
        const { userId, emailId, fullName } = userDetails;
        setCurrentUserId((old) => ({
          userId,
          emailId,
          fullName,
        }));
        //Set User has already onboarded Project
        setProjectOnboarded((old) => true);
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
          setProjectOnboarded((old) => true);
          console.log('Project Onboarded');
        }
      }
    };
    getTourmeUserDetails();
  }, [userId, currentEnvironment]);

  //Handle Side Effect when Menu is Toggled
  useEffect(() => {}, [menuToggle]);

  return (
    <div>
      <Menu menuToggleHandler={menuToggleHandler} />
    </div>
  );
}
