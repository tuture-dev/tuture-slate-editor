import { isInCodeBlock } from "../utils/";

import wrapCodeBlock from "./wrapCodeBlock";
import unwrapCodeBlock from "./unwrapCodeBlock";

function toggleCodeBlock(options, editor, type) {
  if (isInCodeBlock(options, editor.value)) {
    return unwrapCodeBlock(options, editor, type);
  }
  return wrapCodeBlock(options, editor);
}

export default toggleCodeBlock;
