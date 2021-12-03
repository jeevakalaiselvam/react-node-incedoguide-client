import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu';
import {
  actionSetEnvironment,
  actionSetIdentifier,
  actionSetJoyrideStart,
  actionSetJoyrideSteps,
  actionSetUserIdle,
  apiGetAllGuides,
  apiMarkGuideComplete,
} from './redux/slice/projectSlice';
import ReactJoyride, { EVENTS, STATUS } from 'react-joyride';
import { apiFetchUserDetails } from './redux/slice/userSlice';
import { useIdleTimer } from 'react-idle-timer';
import UserIdleModal from './uicomponents/UserIdleModal';

export default function Core({
  userId,
  environment = 'LOCAL',
  projectName,
  fullName,
  emailId,
  projectRoles,
  currentUserId,
  currentUserRoles,
}) {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const { userDetails, projectDetails } = user;
  const { identifier, joyrideStart, joyrideSteps, userIdle } = project;
  const { projectId } = projectDetails;
  const { currentEnvironment, selectedGuideId } = project;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionSetEnvironment(environment));
    dispatch(
      apiFetchUserDetails({
        userId,
        emailId,
        fullName,
        projectName,
        currentEnvironment,
        projectRoles,
        currentUserId,
        currentUserRoles,
      })
    );
    if (typeof window !== 'undefined') {
      // dispatch(actionSetIdentifier(window.location.pathname));
      dispatch(actionSetIdentifier('/'));
    }
  }, [
    userId,
    emailId,
    fullName,
    projectName,
    currentEnvironment,
    dispatch,
    environment,
    currentUserId,
    projectRoles,
    currentUserRoles,
  ]);

  useEffect(() => {
    if (projectId !== '' && identifier !== '') {
      dispatch(
        apiGetAllGuides({
          projectId,
          identifier,
          environment: currentEnvironment,
        })
      );

      //Check for any guides not completed from different page
      const oldGuideStarted = localStorage.getItem('IG_STEPS');
      if (oldGuideStarted !== 'null' && oldGuideStarted !== null) {
        const oldGuideStepIndex = JSON.parse(oldGuideStarted).currentStepIndex;
        const oldGuideId = JSON.parse(oldGuideStarted).selectedGuideId;

        //Wait until document loads before triggering steps left from last guide start in different page
        setTimeout(() => {
          dispatch(actionSetJoyrideStart(true));
          dispatch(actionSetJoyrideSteps(oldGuideId));
          setCurrentStepIndex((old) => +oldGuideStepIndex + 0.5); //BUG - Temporary fix for double render in useEffect
        }, 1000);
      }
    }
  }, [projectId, identifier, currentEnvironment, dispatch]);

  //Joyride Handlers
  const handleJoyrideCallback = (data) => {
    if (joyrideStart) {
      localStorage.setItem(
        'IG_STEPS',
        JSON.stringify({
          selectedGuideId,
          currentStepIndex: currentStepIndex,
        })
      );

      const { status, type } = data;
      if (type === EVENTS.TOOLTIP_CLOSE) {
        dispatch(actionSetJoyrideStart(false));
      } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        if (type === EVENTS.TARGET_NOT_FOUND) {
          //If Target is not found, It means the element is not present on the screen
          setCurrentStepIndex((old) => currentStepIndex - 1);
        } else {
          //Target is present on the screen
          setCurrentStepIndex((old) => currentStepIndex + 1);
        }
      }
      if (status === STATUS.FINISHED) {
        dispatch(
          apiMarkGuideComplete({
            projectId,
            selectedGuideId,
            userId,
            currentEnvironment,
          })
        );
        setCurrentStepIndex((old) => 0);
        dispatch(actionSetJoyrideStart(false));
        localStorage.setItem('IG_STEPS', null);
      }
      if (status === STATUS.SKIPPED) {
        //localStorage.setItem('IG_STEPS', null);
        dispatch(actionSetJoyrideStart(false));
      }
    } else {
    }
  };
  const getHelpers = () => {};

  //Handle Idle Timer Logic
  const handleOnIdle = (event) => {
    dispatch(actionSetUserIdle(true));
  };

  //When user is active
  const handleOnActive = (event) => {};

  //When user does something
  const handleOnAction = (event) => {};

  useIdleTimer({
    timeout: 1000 * 10 * 60, //10 Mins of Inactivity
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <>
      {/* Display Idle Modal when user is inactive */}
      {userIdle && <UserIdleModal />}
      {userDetails && projectDetails && <Menu />}
      <ReactJoyride
        callback={handleJoyrideCallback}
        continuous={true}
        getHelpers={getHelpers}
        run={joyrideStart}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        spotlightClicks={true}
        steps={joyrideSteps}
        stepIndex={currentStepIndex}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: 'orange',
          },
        }}
      />
    </>
  );
}
