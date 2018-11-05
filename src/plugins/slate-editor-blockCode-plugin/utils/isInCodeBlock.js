function isInCodeBlock(options, value) {
  const { document, selection } = value;
  const codeBlock = document.getClosest(
    selection.start.key,
    block => block.type === options.containerType
  );

  return Boolean(codeBlock);
}

export default isInCodeBlock;
