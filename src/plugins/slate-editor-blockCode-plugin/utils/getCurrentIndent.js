// @flow

import getIndent from "./getIndent";
import getCurrentCode from "./getCurrentCode";

/**
 * Detect indentation in the current code block
 */
function getCurrentIndent(options, value) {
  if (options.getIndent) {
    return options.getIndent(value);
  }

  const currentCode = getCurrentCode(options, value);
  if (!currentCode) {
    return "";
  }

  const text = currentCode
    .getTexts()
    .map(t => t.text)
    .join("\n");
  return getIndent(text);
}

export default getCurrentIndent;
