import unique from 'unique-selector';
import { setDOMItemSelected } from '../redux/slice/menuSlice';

export const handleDOMSelect = (document, startDOMSelect, dispatch) => {
  // document.addEventListener('keydown', (e) => {
  //   if (e.shiftKey) {
  //     setSpecialModifierPressed((_) => true);
  //   }
  // });
  // document.addEventListener('keyup', (e) => {
  //   if (e.shiftKey) {
  //     setSpecialModifierPressed((_) => false);
  //   }
  // });

  const removeListeners = () => {
    console.log('Removing all Listeners');
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      element.removeEventListener('click', mouseClickListener, true);
      element.removeEventListener('mouseenter', mouseEnterListener, true);
      element.removeEventListener('mouseleave', mouseLeaveListener, true);
      element.style.border = 'none';
    });
  };

  const mouseClickListener = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDOMItemSelected(unique(e.target)));
    removeListeners();
  };

  const mouseEnterListener = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const elementInner = e.target;
    elementInner.style.border = '1px solid rgba(0,0,0,0.3)';
  };

  const mouseLeaveListener = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const elementInner = e.target;
    elementInner.style.border = 'none';
  };

  if (startDOMSelect) {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      element.addEventListener('click', mouseClickListener, true);
      element.addEventListener('mouseenter', mouseEnterListener, true);
      element.addEventListener('mouseleave', mouseLeaveListener, true);
    });
  }
};
