import {
  APIVERSION,
  BASE_URL,
  REST_FETCH_PROJECT_INFO,
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
      userId: userId.toUpperCase(),
      fullName,
      emailId,
      projectName: projectName.toUpperCase(),
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

export const fetchProjectDetails = async ({ projectName, userId }, env) => {
  const url = `${BASE_URL[env]}/${APIVERSION}/${REST_FETCH_PROJECT_INFO}`;
  try {
    const { data } = await axios.post(url, {
      userId,
      projectName: projectName.toUpperCase().trim(),
    });
    const { project } = data;
    if (project) {
      return project;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
