import wrapCodeBlockByKey from "./wrapCodeBlockByKey";

function wrapCodeBlock(options, editor) {
  const { value } = editor;
  const { startBlock, selection, document } = value;

  wrapCodeBlockByKey(options, editor, startBlock.key);

  editor
    .moveToStartOfNode(document.getDescendant(startBlock.key))
    .moveAnchorTo(selection.start.offset)
    .moveFocusTo(selection.start.offset);

  return editor;
}

export default wrapCodeBlock;
