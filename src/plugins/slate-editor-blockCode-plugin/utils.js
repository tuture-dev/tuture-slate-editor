import React from "react";
import styled from "styled-components";

import core from "./core";
import Options from "./options";

const corePlugin = core(new Options());

const BlockCode = styled("div")`
  padding: 10px;
  background-color: #eee;
  white-space: pre-wrap;
`;

const CodeLine = styled("pre")`
  background: #eee;
  margin: 0;
`;

export const DefaultRenderNode = props => {
  const { attributes, children, node } = props;
  console.log("node", node);
  return <BlockCode {...attributes}>{children}</BlockCode>;
};

export const DefaultLineNode = props => {
  const { attributes, children, node } = props;
  return <CodeLine {...attributes}>{children}</CodeLine>;
};

const defaultAfterChange = (editor, event, matches, afterOffset) => {
  let newEditor = editor;
  if (matches.before[2]) {
    const lang = matches.before[2];
    newEditor = editor.setBlocks({ data: { syntax: lang } });
  }
  corePlugin.changes.wrapCodeBlock(newEditor.moveTo(afterOffset));
};

export const defaultNodeType = "code_block";
export const defaultCommand = "addBlockCode";
export const defaultMarkdown = {
  trigger: "Enter",
  before: /^(```)(\w*)$/,
  afterChange: defaultAfterChange
};
