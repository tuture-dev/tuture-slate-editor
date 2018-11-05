import { DEFAULT_INDENTATION } from "../utils/";
import { dedentLines } from "../changes/";

function onShiftTab(options, event, editor) {
  const { value } = editor;
  event.preventDefault();
  event.stopPropagation();

  const indent = DEFAULT_INDENTATION;

  return dedentLines(options, editor, indent);
}

export default onShiftTab;
