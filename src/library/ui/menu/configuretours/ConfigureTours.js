import React from 'react';
import ConfigureToursOptions from './fragments/ConfigureTourOptions';
import { useSelector, useDispatch } from 'react-redux';
import { CONFIGURE_TOUR_MENU_OPTIONS } from '../../../util/configureTourUtils';
import AddNewTour from './fragments/AddNewTour';

export default function ConfigureTours() {
  const { visible, action, addTour, editTour, reorderTour, deleteTour } =
    useSelector((state) => state.menu.configureTourMenu);

  const dispatch = useDispatch();

  return (
    <div>
      <ConfigureToursOptions />
      {addTour.visible && <AddNewTour />}
    </div>
  );
}
