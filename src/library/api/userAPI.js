import {
  APIVERSION,
  BASE_URL,
  REST_FETCH_USER_INFO,
} from '../constants/urlConstants';
import axios from 'axios';

export const fetchUserDetails = async ({ userId }, env) => {
  const url = `${BASE_URL[env]}/${APIVERSION}/${REST_FETCH_USER_INFO}`;
  try {
    const { data } = await axios.post(url, { userId });
    const { tourmeUser } = data;
    console.log('TOURME', tourmeUser);
    if (tourmeUser) {
      return tourmeUser;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
