import {
  APIVERSION,
  BASE_URL,
  REST_FETCH_USER_DETAILS,
} from '../constants/urlConstants';
import axios from 'axios';

const fetchUserDetails = async (
  { userId, emailId, fullName, projectName },
  environment = 'LOCAL'
) => {
  const url = `${BASE_URL[environment]}/${APIVERSION}/${REST_FETCH_USER_DETAILS}`;
  try {
    const { data } = await axios.post(url, {
      userId,
      emailId,
      fullName,
      projectName,
    });
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

const userAPI = { fetchUserDetails };

export default userAPI;
