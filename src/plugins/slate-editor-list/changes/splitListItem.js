import { getCurrentItem } from "../utils/";

function splitListItem(options, editor) {
  const { value } = editor;
  const { selection } = value;
  const currentItem = getCurrentItem(options, value);
  if (!currentItem) {
    return editor;
  }

  const splitOffset = selection.start.offset;

  return editor.splitDescendantsByKey(
    currentItem.key,
    selection.start.key,
    splitOffset
  );
}

export default splitListItem;
