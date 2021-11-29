import { getBaseUrl } from '../constants/urlConstants';
import axios from 'axios';

//Get User Details
export const fetchUserDetails = async ({
  userId,
  emailId,
  fullName,
  projectName,
  environment,
  projectRoles,
  currentUserId,
}) => {
  const url = `${getBaseUrl(environment)}user/info`;
  const response = await axios.post(url, {
    userId,
    emailId,
    fullName,
    projectName: projectName.toUpperCase(),
    projectRoles,
    currentUserId,
  });
  if (response.status === 200 || response.status === 201) {
    return { ...response.data, currentUserId };
  } else {
    throw new Error('No User Data obtained');
  }
};

const userApi = { fetchUserDetails };
export default userApi;
