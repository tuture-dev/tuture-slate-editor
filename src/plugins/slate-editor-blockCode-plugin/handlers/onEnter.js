import detectIndent from "detect-indent";

function onEnter(options, event, editor, next) {
  const { value } = editor;

  if (!value.selection.isCollapsed) {
    return next();
  }

  event.preventDefault();

  const { startBlock } = value;
  const currentLineText = startBlock.text;
  const indent = detectIndent(currentLineText).indent || "";

  return editor
    .splitBlock()
    .insertText(indent)
    .focus();
}

export default onEnter;
