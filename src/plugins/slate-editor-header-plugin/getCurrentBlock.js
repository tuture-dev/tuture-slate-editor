export const getCurrentBlock = (options, value, block) => {
  const { document } = value;

  if (!block) {
    if (!value.selection.start.key) return null;
    block = value.startBlock;
  }

  return block.type === options.type ? block : null;
};

export const isSelectionInBlock = (options, value) => {
  return getCurrentBlock(options, value) ? true : false;
};
