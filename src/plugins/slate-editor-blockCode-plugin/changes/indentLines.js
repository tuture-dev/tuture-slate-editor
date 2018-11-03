/**
 * Indent all lines in selection
 */
function indentLines(
  options,
  editor,
  // Indent to add
  indent
) {
  const { value } = editor;
  const { document, selection } = value;
  const lines = document
    .getBlocksAtRange(selection)
    .filter(node => node.type === options.lineType);

  return lines.reduce((c, line) => {
    // Insert an indent at start of line
    const text = line.nodes.first();
    return c.insertTextByKey(text.key, 0, indent);
  }, editor);
}

export default indentLines;
