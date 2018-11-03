import { getCurrentIndent } from "../utils/";
import { dedentLines } from "../changes/";

function onShiftTab(options, event, editor) {
  const { value } = editor;
  event.preventDefault();
  event.stopPropagation();

  const indent = getCurrentIndent(options, value);

  return dedentLines(options, editor, indent);
}

export default onShiftTab;
