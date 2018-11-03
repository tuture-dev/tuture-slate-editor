import { getCurrentBlock } from "./getCurrentBlock";

const onMetaEnter = (event, editor, next) => {
  const { value } = editor;
  const { startBlock } = value;

  if (!getCurrentBlock({ type: "blockquote" }, value)) {
    return next();
  }

  if (startBlock.text.length !== 0) {
    return next();
  }

  event.preventDefault();
  return editor.unwrapBlock("blockquote");
};

export default onMetaEnter;
