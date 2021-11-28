import React from 'react';
import GuideVideo from '../uicomponents/GuideVideo';

//Get a step and append video dom to it
export const embedVideoContent = (userProvidedStepContent) => {
  const newContent = (
    <React.Fragment>
      <h5>{userProvidedStepContent}</h5>
      <GuideVideo />
    </React.Fragment>
  );
  return newContent;
};

//Get user provided content and add video element to it
export const addVideoToStep = (steps) => {
  const newSteps = steps.map((step) => {
    const newContent = embedVideoContent(step.content);
    console.log(newContent);
    return { ...step, content: newContent };
  });
  return newSteps;
};
