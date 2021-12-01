export const checkIfGuideShouldBeVisibleToUser = (
  guideRoles,
  currentUserRoles
) => {
  let shouldGuideBeVisible = false;
  currentUserRoles.forEach((role) => {
    if (guideRoles.includes(role)) {
      shouldGuideBeVisible = true;
    }
  });

  return shouldGuideBeVisible;
};
