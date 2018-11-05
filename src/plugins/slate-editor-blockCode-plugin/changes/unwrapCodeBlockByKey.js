function unwrapCodeBlockByKey(options, editor, key, type) {
  const { value } = editor;
  const { document } = value;

  const codeBlock = document.getDescendant(key);

  if (!codeBlock || codeBlock.type !== options.containerType) {
    return editor;
  }

  codeBlock.nodes.forEach(line =>
    editor
      .setNodeByKey(line.key, { type }, { normalize: false })
      .unwrapNodeByKey(line.key, { normalize: false })
  );

  return editor;
}

export default unwrapCodeBlockByKey;
