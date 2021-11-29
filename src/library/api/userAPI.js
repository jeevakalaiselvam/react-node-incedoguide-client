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
  currentUserRoles,
}) => {
  const url = `${getBaseUrl(environment)}user/info`;
  const response = await axios.post(url, {
    userId,
    emailId,
    fullName,
    projectName: projectName.toUpperCase(),
    projectRoles,
    currentUserId,
    currentUserRoles,
  });
  if (response.status === 200 || response.status === 201) {
    return { ...response.data, currentUserId, currentUserRoles };
  } else {
    throw new Error('No User Data obtained');
  }
};

const userApi = { fetchUserDetails };
export default userApi;
