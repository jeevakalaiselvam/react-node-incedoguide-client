export const MAIN_MENU_OPTIONS = {
  TOURME_ADMIN: [
    {
      title: 'Configure Tours',
      action: 'CONFIGURE_TOURS',
    },
    {
      title: 'Tour Visbility',
      action: 'TOUR_VISIBILITY',
    },
    {
      title: 'Project Admins',
      action: 'project_admins',
    },
    {
      title: 'Provide Feedback',
      action: 'PROJECT_ADMINS',
    },
  ],
  TOURME_USER: [
    {
      title: 'Provide Feedback',
      action: 'PROVIDE_FEEDBACK',
    },
  ],
};

//Main Menu Actions
export const CONFIGURE_TOURS = 'CONFIGURE_TOURS';
export const TOUR_VISIBILITY = 'TOUR_VISIBILITY';
export const PROJECT_ADMINS = 'PROJECT_ADMINS';
export const PROVIDE_FEEDBACK = 'PROVIDE_FEEDBACK';

//Configure Tours States
export const CONFIGURE_TOURS_START = 'CONFIGURE_TOURS_START';
export const CONFIGURE_TOURS_DOM_SELECT = 'CONFIGURE_TOURS_DOM_SELECT';

//Tour Visibility States
export const TOUR_VISIBILITY_START = 'TOUR_VISIBILITY_START';

//Project Admins States
export const PROJECT_ADMIN_START = 'PROJECT_ADMIN_START';

//Provide Feedback States
export const PROVIDE_FEEDBACK_START = 'PROVIDE_FEEDBACK_START';
