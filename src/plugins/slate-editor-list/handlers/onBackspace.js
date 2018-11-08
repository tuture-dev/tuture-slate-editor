import { unwrapList } from "../changes/";
import { getCurrentItem } from "../utils/";

function onBackspace(options, event, editor, next) {
  const { value } = editor;
  const { selection, startText } = value;

  if (selection.isExpanded) {
    return next();
  }

  if (selection.start.offset > 0) {
    return next();
  }

  const currentItem = getCurrentItem(options, value);
  if (!currentItem) {
    return next();
  }

  const isStartOfList =
    selection.start.offset === 0 &&
    currentItem.getFirstText().equals(startText);
  if (!isStartOfList) {
    return next();
  }

  event.preventDefault();
  return unwrapList(options, editor);
}

export default onBackspace;
