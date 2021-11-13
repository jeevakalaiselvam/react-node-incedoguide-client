import { fetchProjectDetails, onboardProject } from '../api/projectAPI';
import { fetchUserDetails } from '../api/userAPI';
import { TOURME_ROLES } from '../util/tourmeRoles';

export const getTourmeUserDetails = async (
  { userId, emailId, fullName, projectName, environment },
  setUserDetails,
  setProjectOnboarded,
  setUserRoleType
) => {
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
