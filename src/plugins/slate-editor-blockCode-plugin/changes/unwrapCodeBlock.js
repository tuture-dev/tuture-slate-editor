import { getCurrentCode } from "../utils/";
import unwrapCodeBlockByKey from "./unwrapCodeBlockByKey";

function unwrapCodeBlock(options, editor, type) {
  const { value } = editor;

  const codeBlock = getCurrentCode(options, value);

  if (!codeBlock) {
    return editor;
  }

  unwrapCodeBlockByKey(options, editor, codeBlock.key, type);

  return editor;
}

export default unwrapCodeBlock;
