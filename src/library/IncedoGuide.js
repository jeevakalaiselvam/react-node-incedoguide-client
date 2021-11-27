import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Core from './Core';
import './incedoguide.css';
export default function IncedoGuide({
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
