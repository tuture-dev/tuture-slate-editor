function isInCodeBlock(options, value) {
  const { document, start } = value;
  const codeBlock = document.getClosest(
    start.key,
    block => block.type === options.containerType
  );

  return Boolean(codeBlock);
}

export default isInCodeBlock;
