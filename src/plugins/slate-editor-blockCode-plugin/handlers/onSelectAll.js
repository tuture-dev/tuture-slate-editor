import { getCurrentCode } from "../utils/";

function onSelectAll(options, event, editor, next) {
  const { value } = editor;
  event.preventDefault();

  const currentCode = getCurrentCode(options, value);
  return editor
    .moveToStartOfNode(currentCode.getFirstText())
    .moveFocusToEndOfNode(currentCode.getLastText());
}
export default onSelectAll;
