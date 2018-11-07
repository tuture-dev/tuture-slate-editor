function getCurrentItem(options, value, block) {
  const { document } = value;

  if (!block) {
    if (!value.selection.start.key) {
      return null;
    }
    block = value.startBlock;
  }

  const parent = document.getParent(block.key);
  return parent && parent.type === options.typeItem ? parent : null;
}
