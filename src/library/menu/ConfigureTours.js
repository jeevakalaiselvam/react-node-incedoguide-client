import React from 'react';
import { useSelector } from 'react-redux';
import {
  CONFIGURE_TOURS_START,
  CONFIGURE_TOURS_DOM_SELECT,
} from '../constants/menuConstants';
import ConfigureToursStart from './configuretours/ConfigureToursStart';
import ConfigureToursDomSelect from './configuretours/ConfigureToursDomSelect';

export default function ConfigureTours() {
  const menu = useSelector((state) => state.menu);
  const { configureToursState } = menu;

  return (
    <>
      {configureToursState === CONFIGURE_TOURS_START && <ConfigureToursStart />}
      {configureToursState === CONFIGURE_TOURS_DOM_SELECT && (
        <ConfigureToursDomSelect />
      )}
    </>
  );
}
