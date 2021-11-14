import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from './redux/slice/userSlice';
import Menu from './ui/Menu';

export default function Core({
  userId,
  environment,
  projectName,
  fullName,
  emailId,
}) {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById({ userId, environment }));
  }, []);

  useEffect(() => {
    console.log('User Details Changed');
  }, [user]);

  return <>{user && <Menu userId={user.userId} />}</>;
}
