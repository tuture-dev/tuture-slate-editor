import { Block } from "slate";

import {
  getPreviousItem,
  getCurrentItem,
  getListForItem,
  isList
} from "../utils/";

function increaseItemDepth(options, editor) {
  const previousItem = getPreviousItem(options, editor.value);
  const currentItem = getCurrentItem(options, editor.value);

  if (!previousItem) {
    return editor;
  }

  if (!currentItem) {
    return editor;
  }

  return moveAsSubItem(options, editor, currentItem, previousItem.key);
}

function moveAsSubItem(options, editor, item, destKey) {
  const destination = editor.value.document.getDescendant(destKey);
  const lastIndex = destination.nodes.size;
  const lastChild = destination.nodes.last();

  const existingList = isList(options, lastChild) ? lastChild : null;

  if (existingList) {
    return editor.moveNodeByKey(
      item.key,
      existingList.key,
      existingList.nodes.size
    );
  }

  const currentList = getListForItem(options, editor.value, destination);
  if (!currentList) {
    return null;
  }

  const newSubList = Block.create({
    object: "block",
    type: currentList.type,
    data: currentList.data
  });

  editor.insertNodeByKey(destKey, lastIndex, newSubList, {
    normalize: false
  });

  return editor.moveNodeByKey(item.key, newSubList.key, 0);
}

export default increaseItemDepth;
