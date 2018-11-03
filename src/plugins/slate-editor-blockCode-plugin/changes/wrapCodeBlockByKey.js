import { deserializeCode } from "../utils/";

function wrapCodeBlockByKey(options, editor, key) {
  const { value } = editor;
  const { document } = value;

  const startBlock = document.getDescendant(key);
  const text = startBlock.text;

  // Remove all child
  startBlock.nodes.forEach(node => {
    editor.removeNodeByKey(node.key, { normalize: false });
  });

  // Insert new text
  const toInsert = deserializeCode(options, text);

  toInsert.nodes.forEach((node, i) => {
    editor.insertNodeByKey(startBlock.key, i, node, { normalize: false });
  });

  editor.setNodeByKey(startBlock.key, {
    type: options.containerType
  });

  return editor;
}

export default wrapCodeBlockByKey;
