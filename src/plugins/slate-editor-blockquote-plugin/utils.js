import React from "react";

import styled from "styled-components";

const Blockquote = styled("blockquote")`
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0;
  margin-bottom: 16px;
`;

export const DefaultRenderNode = props => {
  const { attributes, children, node } = props;
  return <Blockquote {...attributes}>{children}</Blockquote>;
};

const defaultAfterChange = (change, event, matches, afterOffset) => {
  change.moveTo(afterOffset).wrapBlock("blockquote");
};

export const defaultNodeType = "blockquote";
export const defaultCommand = "addBlockquoteBlock";
export const defaultMarkdown = {
  trigger: "space",
  before: /^(>)$/,
  afterChange: defaultAfterChange
};
