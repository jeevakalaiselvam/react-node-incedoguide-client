const ALL_MENU_ITEMS = {
  TOUR_CONFIGURATION: {
    title: 'Tour Configuration',
    action: 'TOUR_CONFIGURATION',
  },
  TOUR_VISIBILITY: {
    title: 'Tour Visibility',
    action: 'TOUR_VISIBILITY',
  },
  PROVIDE_FEEDBACK: {
    title: 'Provide Feedback',
    action: 'PROVIDE_FEEDBACK',
  },
};

export const menuListForRole = {
  ADMIN: [
    ALL_MENU_ITEMS['TOUR_CONFIGURATION'],
    ALL_MENU_ITEMS['TOUR_VISIBILITY'],
    ALL_MENU_ITEMS['PROVIDE_FEEDBACK'],
  ],
  USER: [ALL_MENU_ITEMS['PROVIDE_FEEDBACK']],
};

export const generateMenuForRoles = (roleList) => {
  let menuItems = [];

  //For all Roles passed by user to Tourme, Add related Menu items
  //If user has 'ADMIN' role, His Menu will be populated with Admin Menu Items from roleMappings
  roleList.forEach((role) => {
    if (menuListForRole[role].length) {
      menuItems = [...menuItems, ...menuListForRole[role]];
    }
  });

  return [...new Set(menuItems)];
};
