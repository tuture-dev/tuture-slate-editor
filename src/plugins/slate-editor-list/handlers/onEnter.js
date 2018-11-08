import { unwrapList, decreaseItemDepth, splitListItem } from "../changes/";
import { getCurrentItem, getItemDepth } from "../utils/";

function onEnter(options, event, editor, next) {
  if (event.shiftKey) {
    return next();
  }

  const { value } = editor;
  const currentItem = getCurrentItem(options, value);

  if (!currentItem) {
    return next();
  }

  event.preventDefault();

  if (value.selection.isExplaned) {
    editor.delete();
  }

  if (currentItem.isEmpty) {
    if (getItemDepth(options, value) > 1) {
      return decreaseItemDepth(options, editor);
    }

    return unwrapList(options, editor);
  }

  return splitListItem(options, editor);
}

export default onEnter;
