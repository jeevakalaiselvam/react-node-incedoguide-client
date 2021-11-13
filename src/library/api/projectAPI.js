import {
  APIVERSION,
  BASE_URL,
  REST_PROJECT_ONBOARD,
} from '../constants/urlConstants';
import axios from 'axios';

export const onboardProject = async (
  { userId, fullName, emailId, projectName, roleType },
  environment
) => {
  const onboardURL = `${BASE_URL[environment]}/${APIVERSION}/${REST_PROJECT_ONBOARD}`;
  try {
    const { data } = await axios.post(onboardURL, {
      userId,
      fullName,
      emailId,
      projectName,
      roleType,
    });
    const { user, project } = data;
    if (user && project) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
