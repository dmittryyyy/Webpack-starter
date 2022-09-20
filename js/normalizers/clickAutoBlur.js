/**
 * Removes :focus outline on buttons and links with click (except the case
 * when the focus was set with keyboard).
 */
// TODO: get rid of "flickering" :focus outline when the link is pressed

export default () => {
  let focusedElement = null;
  const interactiveButtonsSelector = 'a, button';
  const onFocusSet = (event) => {
    let element = event.target;
    if (!element.matches) {
      return;
    }

    while (element) {
      if (element.matches(interactiveButtonsSelector)) {
        break;
      }
      element = element.parentElement;
    }

    focusedElement = element;
  };

  const removeFocus = () => {
    if (focusedElement) {
      focusedElement.blur();
    }

    focusedElement = null;
  };

  document.addEventListener('mouseup', removeFocus);
  document.addEventListener('touchend', removeFocus);

  document.addEventListener('turbo:click', () => {
    const nodes = document.querySelectorAll(interactiveButtonsSelector);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].removeEventListener('mousedown', onFocusSet);
      nodes[i].removeEventListener('touchstart', onFocusSet);
    }
  });

  const onRender = () => {
    const nodes = document.querySelectorAll(interactiveButtonsSelector);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('mousedown', onFocusSet);
      nodes[i].addEventListener('touchstart', onFocusSet);
    }
  };

  document.addEventListener('turbo:render', onRender);
  window.addEventListener('load', onRender);
};
