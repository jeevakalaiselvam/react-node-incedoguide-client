export const MAIN_MENU_OPTIONS = {
  ADMIN_USER: [
    {
      title: 'Setup Guides',
      action: 'MENU_OPTION_CONFIGURE_GUIDES',
    },
    {
      title: 'Setup Roles',
      action: 'MENU_OPTION_SETUP_ROLES',
    },
    {
      title: 'Setup Visibility',
      action: 'MENU_OPTION_SETUP_VISIBILITY',
    },
  ],
  NORMAL_USER: [
    {
      title: 'Provide Feedback',
      action: 'MENU_OPTION_PROVIDE_FEEDBACK',
    },
  ],
};

//Menu Option Keys
export const ADMIN_USER = 'ADMIN_USER';
export const NORMAL_USER = 'NORMAL_USER';

//Main Admin Role
export const MAIN_ADMIN = 'MAIN_ADMIN';

//Menu Toggle Options
export const MENU_TOGGLE_OPEN = 'MENU_TOGGLE_OPEN';
export const MENU_TOGGLE_CLOSE = 'MENU_TOGGLE_CLOSE';
