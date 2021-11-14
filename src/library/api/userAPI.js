import {
  APIVERSION,
  BASE_URL,
  REST_FETCH_USER_DETAILS,
  REST_ONBOARD_PROJECT,
} from '../constants/urlConstants';
import axios from 'axios';

const fetchUserDetails = async ({ userId }, environment = 'LOCAL') => {
  const url = `${BASE_URL[environment]}/${APIVERSION}/${REST_FETCH_USER_DETAILS}`;
  try {
    const { data } = await axios.post(url, { userId });
    const { tourmeUser, projectsForUser } = data;
    if (tourmeUser && projectsForUser) {
      return { tourmeUser, projectsForUser };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onboardUserAndProject = async (
  { userId, fullName, emailId, projectName, roleType },
  environment
) => {
  const onboardURL = `${BASE_URL[environment]}/${APIVERSION}/${REST_ONBOARD_PROJECT}`;
  try {
    const { data } = await axios.post(onboardURL, {
      userId: userId.toUpperCase(),
      fullName,
      emailId,
      projectName: projectName.toUpperCase(),
      roleType,
    });
    const { user, projects } = data;
    if (user && projects) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const userAPI = { fetchUserDetails, onboardUserAndProject };

export default userAPI;
