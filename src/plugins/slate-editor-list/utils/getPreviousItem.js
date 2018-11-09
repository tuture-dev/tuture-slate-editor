import getCurrentItem from "./getCurrentItem";

function getPreviousItem(options, value, block) {
  const { document, startBlock } = value;
  block = block || startBlock;

  const currentItem = getCurrentItem(options, value, block);
  if (!currentItem) {
    return null;
  }

  const previousSibling = document.getPreviousSibling(currentItem.key);

  if (!previousSibling) {
    return null;
  } else if (previousSibling.type === options.typeItem) {
    return previousSibling;
  }

  return null;
}

export default getPreviousItem;
