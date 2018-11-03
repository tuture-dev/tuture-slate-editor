function firstDifferentCharacter(a, b) {
  if (a.length > b.length) {
    return firstDifferentCharacter(b, a);
  }

  const indexes = Array(a.length)
    .fill()
    .map((v, i) => i);
  const index = indexes.find(i => a[i] !== b[i]);

  return index === undefined ? a.length : index;
}

function dedentLines(options, editor, indent) {
  const { value } = editor;
  const { document, selection } = value;
  const lines = document
    .getBlocksAtRange(selection)
    .filter(node => node.type === options.lineType);

  return lines.reduce((editor, line) => {
    const textNode = line.nodes.first();
    console.log("indentRes", indent);
    const lengthToRemove = firstDifferentCharacter(textNode.text, indent);

    return editor.removeTextByKey(textNode.key, 0, lengthToRemove);
  }, editor);
}

export default dedentLines;
