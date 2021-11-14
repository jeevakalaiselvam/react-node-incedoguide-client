import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Core from './Core';

export default function Tourme({
  userId,
  environment = 'LOCAL',
  projectName,
  fullName,
  emailId,
}) {
  return (
    <Provider store={store}>
      <Core
        userId={userId}
        environment={environment}
        projectName={projectName}
        fullName={fullName}
        emailId={emailId}
      />
    </Provider>
  );
}
