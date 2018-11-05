import { DEFAULT_INDENTATION } from "../utils/";
import { indentLines } from "../changes/";

function onTab(options, event, editor, next) {
  const { value } = editor;
  event.preventDefault();
  event.stopPropagation();

  const { selection } = value;
  const indent = DEFAULT_INDENTATION;

  if (selection.isCollapsed) {
    return editor.insertText(indent).focus();
  }

  return indentLines(options, editor, indent);
}

export default onTab;
