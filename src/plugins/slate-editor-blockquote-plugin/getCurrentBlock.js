export const getCurrentBlock = (options, value, block) => {
  const { document } = value;

  if (!block) {
    if (!value.selection.start.key) return null;
    block = value.startBlock;
  }

  const parent = document.getParent(block.key);

  return parent && parent.type === options.type ? parent : null;
};

export const isSelectionInBlock = (options, value) => {
  return getCurrentBlock(options, value) ? true : false;
};
