import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import unique from 'unique-selector';
import { actionConfigureGuidesNewCurrentAction } from '../../../redux/slice/menuSlice';
import {
  CG_NEW_ADD_DETAILS,
  CG_NEW_START,
} from '../../../menuconstants/CG_New';

export default function ANG_2_DomSelect() {
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
      actionConfigureGuidesNewCurrentAction({
        action: CG_NEW_ADD_DETAILS,
        data: targetElement,
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

      document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
          const allElements = document.querySelectorAll('*');

          allElements.forEach((element) => {
            element.removeEventListener('mouseenter', mouseEnterHandler, true);
            element.removeEventListener('mouseleave', mouseLeaveHandler, true);
            element.removeEventListener('click', mouseClickHandler, false);
            element.classList.remove('incedoguide-domselect');
          });

          dispatch(
            actionConfigureGuidesNewCurrentAction({
              action: CG_NEW_START,
              data: {},
            })
          );
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="incedo-dom-select-cancel">PRESS ESC TO CANCEL</div>
    </>
  );
}
