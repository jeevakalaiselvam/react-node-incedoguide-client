import {
  APIVERSION,
  BASE_URL,
  REST_FETCH_USER_INFO,
} from '../constants/urlConstants';
import axios from 'axios';

const fetchUserById = async ({ userId }, environment = 'LOCAL') => {
  const url = `${BASE_URL[environment]}/${APIVERSION}/${REST_FETCH_USER_INFO}`;
  try {
    const { data } = await axios.post(url, { userId });
    const { tourmeUser } = data;
    if (tourmeUser) {
      return tourmeUser;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const userAPI = { fetchUserById };

export default userAPI;
