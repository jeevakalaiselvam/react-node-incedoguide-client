import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './redux/slice/userSlice';
import Menu from './Menu';

export default function Core({
  userId,
  environment,
  projectName,
  fullName,
  emailId,
}) {
  const { userDetails, projectDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUserDetails({ userId, emailId, fullName, projectName, environment })
    );
  }, [userId, emailId, fullName, projectName, environment, dispatch]);

  return <>{userDetails && projectDetails && <Menu />}</>;
}
