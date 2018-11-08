import { Block } from "slate";

import { getItemDepth, getCurrentItem } from "../utils/";

function decreaseItemDepth(options, editor) {
  const { value } = editor;
  const { document } = value;

  const depth = getItemDepth(options, value);
  if (depth === 1) {
    return editor;
  }

  const currentItem = getCurrentItem(options, value);
  if (!currentItem) {
    return editor;
  }

  const currentList = document.getParent(currentItem.key);
  const parentItem = document.getParent(currentList.key);
  const parentList = document.getParent(parentItem.key);

  const followingItems = currentList.nodes
    .skipUntil(i => i === currentItem)
    .rest();

  const willEmptyCurrentList =
    currentList.nodes.size === followingItems.size + 1;

  if (!followingItems.isEmpty()) {
    const subList = Block({
      object: "block",
      type: currentList.type,
      data: currentList.data
    });

    editor.insertNodeByKey(currentItem.key, currentItem.nodes.size, subList, {
      normalize: false
    });

    // editor.moveNodeByKey(
    //   currentItem.key,
    //   parentList.key,
    //   parentList.nodes.indexOf(parentItem) + 1,
    //   { normalize: false },
    // );

    // followingItems.forEach((item, index) =>
    //   editor.moveNodeByKey(
    //     item.key,
    //     subList.key,

    //   )
    // )
  }
}

export default decreaseItemDepth;
