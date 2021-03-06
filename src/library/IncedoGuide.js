import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Core from './Core';
import './incedoguide.css';
export default function IncedoGuide({
  userId,
  environment,
  projectName,
  fullName,
  emailId,
  projectRoles,
  currentUserId,
  currentUserRoles,
}) {
  return (
    <Provider store={store}>
      <Core
        userId={userId}
        environment={environment}
        projectName={projectName}
        fullName={fullName}
        emailId={emailId}
        projectRoles={projectRoles}
        currentUserId={currentUserId}
        currentUserRoles={currentUserRoles}
      />
    </Provider>
  );
}
