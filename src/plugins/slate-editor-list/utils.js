import React from "react";

export const defaultNodeType = "ul_list";
export const defaultCommand = "addUlList";

const defaultAfterChange = (editor, event, matches, afterOffset) => {
  let newEditor = editor;
  newEditor.moveTo(afterOffset).command(defaultCommand);
};

export const defaultMarkdown = {
  trigger: "space",
  before: /^(-)$/,
  afterChange: defaultAfterChange
};

export const DefaultRenderUlNode = props => {
  const { attributes, children } = props;
  return <ul {...attributes}>{children}</ul>;
};

export const DefaultRenderOlNode = props => {
  const { attributes, children } = props;
  return <ol {...attributes}>{children}</ol>;
};

export const DefaultListItemNode = props => {
  const { attributes, children } = props;
  return <li {...attributes}>{children}</li>;
};
