import { APIVERSION, BASE_URL, REST_USER } from '../constants/urlConstants';
import axios from 'axios';

export const fetchTourmeUserDetails = async (userId, env) => {
  const url = `${BASE_URL[env]}/${APIVERSION}/${REST_USER}/${userId}`;
  try {
    const { data } = await axios.get(url);
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
