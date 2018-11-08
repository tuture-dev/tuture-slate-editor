import getCurrentItem from "./getCurrentItem";

function getItemDepth(options, value, block) {
  const { document, startBlock } = value;
  block = block || startBlock;

  const currentItem = getCurrentItem(options, value, block);
  if (!currentItem) {
    return 0;
  }

  const list = document.getParent(currentItem.key);

  return 1 + getItemDepth(options, value, list);
}

export default getItemDepth;
