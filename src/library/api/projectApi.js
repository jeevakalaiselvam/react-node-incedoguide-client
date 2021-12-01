import { getBaseUrl } from '../constants/urlConstants';
import axios from 'axios';

//Mark Guide Complete
export const markGuideComplete = async ({
  projectId,
  selectedGuideId,
  userId,
  environment = 'LOCAL',
}) => {
  const url = `${getBaseUrl(environment)}audit/mark`;
  const response = await axios.post(url, {
    projectId,
    guideId: selectedGuideId,
    userId,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Audit Mark Complete Failed');
  }
};

//Add New Guide
export const addNewGuide = async ({
  projectId = '',
  identifier = '/',
  steps = {},
  title,
  environment = 'LOCAL',
  roleVisibilityList,
}) => {
  const url = `${getBaseUrl(environment)}guide/add`;
  const response = await axios.post(url, {
    projectId,
    identifier,
    steps,
    title,
    roleVisibilityList,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Adding New Guide Failed');
  }
};

//Find All Guides for a ProjectId and Identifier
export const getAllGuides = async ({
  projectId,
  identifier,
  environment = 'LOCAL',
}) => {
  const url = `${getBaseUrl(environment)}guide/all`;
  const response = await axios.post(url, {
    projectId,
    identifier,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Getting All Guides Failed');
  }
};

//Update Guide
export const updateGuide = async ({
  guide,
  projectId = '',
  identifier = '/',
  environment = 'LOCAL',
}) => {
  const url = `${getBaseUrl(environment)}guide/update`;
  const response = await axios.post(url, {
    guide,
    projectId,
    identifier,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Updating Existing Guide Failed');
  }
};

//Delete Guides
export const deleteGuides = async ({
  guideIdsToDelete,
  projectId = '',
  identifier = '/',
  environment = 'LOCAL',
}) => {
  const url = `${getBaseUrl(environment)}guide/delete`;
  const response = await axios.post(url, {
    guideIds: guideIdsToDelete,
    projectId,
    identifier,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Deleting Existing Guide Failed');
  }
};

//Update Project Roles
export const updateProjectRoles = async ({
  userId,
  projectId = '',
  projectRoles,
  environment = 'LOCAL',
}) => {
  const url = `${getBaseUrl(environment)}project/updateRoles`;
  const response = await axios.post(url, {
    userId,
    projectId,
    projectRoles,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Updating Project Roles Failed');
  }
};

//Update Guide Roles
export const updateGuideRoles = async ({
  projectId,
  identifier,
  rolesInGuides,
  environment = 'LOCAL',
}) => {
  const url = `${getBaseUrl(environment)}guide/updateRoles`;
  const response = await axios.post(url, {
    projectId,
    identifier,
    rolesInGuides,
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error('Updating Guide Roles Failed');
  }
};

const projectApi = {
  addNewGuide,
  getAllGuides,
  markGuideComplete,
  updateGuide,
  deleteGuides,
  updateProjectRoles,
  updateGuideRoles,
};
export default projectApi;
