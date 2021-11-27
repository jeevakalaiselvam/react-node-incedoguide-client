import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import unique from 'unique-selector';
import {
  actionConfigureGuidesAddStepsCurrentAction,
  actionConfigureGuidesNewCurrentAction,
} from '../../../redux/slice/menuSlice';
import { CG_NEW_ADD_DETAILS } from '../../../menuconstants/CG_New';
import {
  CG_ADD_STEP_ADD_DETAILS,
  CG_ADD_STEP_DOM_SELECT,
} from '../../../menuconstants/CG_AddStep';

export default function ASEG_4_DomSelect() {
  const dispatch = useDispatch();

  const mouseEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = e.target;
    el.classList.add('incedoguide-domselect');
  };
  const mouseLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = e.target;
    el.classList.remove('incedoguide-domselect');
  };
  const mouseClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const targetElement = unique(e.currentTarget, {
      selectorTypes: ['ID', 'Tag', 'NthChild'],
    });
    const allElements = document.querySelectorAll('*');

    allElements.forEach((element) => {
      element.removeEventListener('mouseenter', mouseEnterHandler, true);
      element.removeEventListener('mouseleave', mouseLeaveHandler, true);
      element.removeEventListener('click', mouseClickHandler, false);
      element.classList.remove('incedoguide-domselect');
    });
    dispatch(
      actionConfigureGuidesAddStepsCurrentAction({
        action: CG_ADD_STEP_ADD_DETAILS,
        data: {
          currentDomTarget: targetElement,
        },
      })
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allElements = document.querySelectorAll('*');

      allElements.forEach((element) => {
        element.addEventListener('mouseenter', mouseEnterHandler, true);
        element.addEventListener('mouseleave', mouseLeaveHandler, true);
        element.addEventListener('click', mouseClickHandler, false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
