import { decreaseItemDepth } from "../changes/";
import { getCurrentItem } from "../utils/";

function onShiftTab(options, event, editor, next) {
  const { value } = editor;
  const { isCollapsed } = value.selection;

  if (!isCollapsed || !getCurrentItem(options, value)) {
    return next();
  }

  event.preventDefault();
  return decreaseItemDepth(options, editor);
}

export default onShiftTab;
