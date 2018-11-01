import { getCurrentBlock } from "./getCurrentBlock";

const onBackspace = (event, editor, next) => {
  const { value } = editor;
  const { selection } = value;

  if (!getCurrentBlock({ type: "h" }, value) || !selection.isCollapsed) {
    return next();
  }

  if (selection.start.offset !== 0) {
    return next();
  }

  event.preventDefault();
  return editor.setBlocks("paragraph");
};

export default onBackspace;
