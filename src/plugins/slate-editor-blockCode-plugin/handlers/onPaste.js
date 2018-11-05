import { getEventTransfer } from "slate-react";
import { Document } from "slate";

import { getCurrentCode, deserializeCode } from "../utils/";

function onPaste(options, event, editor, next) {
  const { value } = editor;
  const data = getEventTransfer(event);
  const currentCode = getCurrentCode(options, value);

  const { endBlock } = value;
  if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
    return next();
  }

  let text;
  if (data.type === "fragment") {
    text = data.fragment
      .getTexts()
      .map(t => t.text)
      .join("\n");
  } else {
    text = data.text;
  }

  const lines = deserializeCode(options, text).nodes;
  const fragment = Document.create({ nodes: lines });

  return editor.insertFragment(fragment);
}

export default onPaste;
