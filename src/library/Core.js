import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjectDetails } from './redux/slice/projectSlice';
import { fetchUserDetails } from './redux/slice/userSlice';
import Menu from './ui/Menu';
import { findProjectByName } from './util/helperMethods';

export default function Core({
  userId,
  environment,
  projectName,
  fullName,
  emailId,
}) {
  const { currentUser, allUserProjects } = useSelector((state) => state.user);
  const { roleType } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  //Get User Details and User Project Details for the first time when Tourme Loads
  useEffect(() => {
    dispatch(
      fetchUserDetails({ userId, fullName, emailId, projectName, environment })
    );
    if (allUserProjects.length) {
      dispatch(
        setProjectDetails(findProjectByName(allUserProjects, projectName))
      );
    }
  }, [currentUser.userId]);

  //Render Menu if User is Present
  return (
    <>
      {currentUser.userId && (
        <Menu userId={currentUser.userId} roleType={roleType} />
      )}
    </>
  );
}
