import React from "react";

import core from "./core";
import Options from "./options";

const corePlugin = core(new Options());

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

const defaultAfterChange = (editor, event, matches, afterOffset) => {
  let newEditor = editor;
  corePlugin.changes.wrapCodeBlock(newEditor.moveTo(afterOffset));
};

export const defaultNodeType = "ul_list";
export const defaultCommand = "addUlList";
export const defaultMarkdown = {
  trigger: "Enter",
  before: /^(-|[1-9])$/,
  afterChange: defaultAfterChange
};
