import React from 'react';
import ConfigureToursOptions from './fragments/ConfigureTourOptions';
import { useSelector, useDispatch } from 'react-redux';
import { CONFIGURE_TOUR_MENU_OPTIONS } from '../../../util/configureTourUtils';
import AddNewTour from './fragments/AddNewTour';

export default function ConfigureTours() {
  const { visible, action, activeSubMenu } = useSelector(
    (state) => state.menu.configureTourMenu
  );
  console.log('CHECKING', {
    action: activeSubMenu,
    constant: CONFIGURE_TOUR_MENU_OPTIONS.ADD_TOUR.action,
  });
  const dispatch = useDispatch();

  return (
    <div>
      <ConfigureToursOptions />
      {activeSubMenu === CONFIGURE_TOUR_MENU_OPTIONS.ADD_TOUR.action && (
        <AddNewTour />
      )}
    </div>
  );
}
