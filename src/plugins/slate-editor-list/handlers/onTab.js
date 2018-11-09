import { decreaseItemDepth, increaseItemDepth } from "../changes/";
import { getCurrentItem } from "../utils/";

function onTab(options, event, editor, next) {
  const { value } = editor;
  const { isCollapsed } = value.selection;

  if (!isCollapsed || !getCurrentItem(options, value)) {
    return next();
  }

  console.log("evnet", event.shiftKey);
  if (event.shiftKey) {
    event.preventDefault();
    console.log("hello dec");
    return decreaseItemDepth(options, editor);
  }

  event.preventDefault();
  return increaseItemDepth(options, editor);
}

export default onTab;
