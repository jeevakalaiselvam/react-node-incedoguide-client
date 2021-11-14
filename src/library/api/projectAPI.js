import {
  APIVERSION,
  BASE_URL,
  REST_FETCH_PROJECT_DETAILS,
  REST_ONBOARD_PROJECT,
} from '../constants/urlConstants';
import axios from 'axios';

export const fetchProjectDetails = async (
  { projectName, userId },
  environment
) => {
  const url = `${BASE_URL[environment]}/${APIVERSION}/${REST_FETCH_PROJECT_DETAILS}`;
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

const projectAPI = { fetchProjectDetails };
export default projectAPI;
