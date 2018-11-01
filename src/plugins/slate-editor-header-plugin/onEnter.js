import { getCurrentBlock } from "./getCurrentBlock";

const onEnter = (event, editor, next) => {
  const { value } = editor;
  const { startBlock } = value;

  if (!getCurrentBlock({ type: "h" }, value)) {
    return next();
  }

  return editor.splitBlock().setBlocks("paragraph");
};

export default onEnter;
