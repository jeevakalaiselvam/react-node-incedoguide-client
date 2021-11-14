import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserDetails,
  setUserRole,
  onboardUserAndProject,
} from './redux/slice/userSlice';
import { fetchProjectDetails } from './redux/slice/projectSlice';
import Menu from './ui/Menu';
import { TOURME_ROLES } from './util/tourmeRoles';

export default function Core({
  userId,
  environment,
  projectName,
  fullName,
  emailId,
}) {
  const { user, projects, userOnboarded } = useSelector(
    (state) => state.user.userDetails
  );

  const dispatch = useDispatch();

  //Get User Details and User Project Details for the first time when Tourme Loads
  useEffect(() => {
    dispatch(fetchUserDetails({ userId, environment }));

    if (Object.keys(user).length) {
      console.log('USER PRESENT');
    } else {
      console.log('ONBOARDING USER');
      dispatch(
        onboardUserAndProject({
          userId,
          fullName,
          emailId,
          projectName,
          roleType: TOURME_ROLES.TOURME_ADMIN,
          environment,
        })
      );
    }
  }, [userId]);

  //Render Menu if User is Present
  return <>{user && <Menu userId={user.userId} />}</>;
}
