import { getCurrentBlock } from "./getCurrentBlock";

const onBackspace = (event, editor, next) => {
  const { value } = editor;
  const { selection } = value;

  if (
    !getCurrentBlock({ type: "blockquote" }, value) ||
    !selection.isCollapsed
  ) {
    return next();
  }

  if (selection.start.offset !== 0) {
    return next();
  }

  event.preventDefault();
  return editor.unwrapBlock("blockquote");
};

export default onBackspace;
