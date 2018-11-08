import endsWith from "ends-with";
import { getCurrentCode, getCurrentIndent } from "../utils/";

function onBackspace(options, event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  if (selection.isExpanded) {
    return next();
  }

  const { startText, startBlock } = value;
  const { start } = selection;
  const currentLine = startBlock;

  const indent = getCurrentIndent(options, value);
  const beforeSelection = currentLine.text.slice(0, start.offset);

  if (endsWith(beforeSelection, indent)) {
    event.preventDefault();

    return editor.deleteBackward(indent.length).focus();
  } else if (options.exitBlockType) {
    const currentCode = getCurrentCode(options, value);
    const isStartOfCode =
      start.offset === 0 && currentCode.getFirstText().equals(startText);
    const isEmpty =
      currentCode.nodes.size === 1 && currentLine.text.length === 0;

    if (isStartOfCode && isEmpty) {
      event.preventDefault();
      return editor
        .setBlocks(options.exitBlockType, { normalize: false })
        .unwrapNodeByKey(currentLine.key);
    }
  }

  return next();
}

export default onBackspace;
