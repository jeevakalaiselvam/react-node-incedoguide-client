import unique from 'unique-selector';

export const handleDOMSelect = (
  document,
  setSpecialModifierPressed,
  startDOMSelect
) => {
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey) {
      setSpecialModifierPressed((_) => true);
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.shiftKey) {
      setSpecialModifierPressed((_) => false);
    }
  });

  if (startDOMSelect) {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      element.addEventListener(
        'click',
        (e) => {
          e.stopPropagation();
          console.log(unique(e.target));
        },
        true
      );
      element.addEventListener(
        'mouseenter',
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          const elementInner = e.target;
          elementInner.style.border = '1px solid rgba(0,0,0,0.3)';
        },
        true
      );
      element.addEventListener(
        'mouseleave',
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          const elementInner = e.target;
          elementInner.style.border = 'none';
        },
        true
      );
    });
  }
};
