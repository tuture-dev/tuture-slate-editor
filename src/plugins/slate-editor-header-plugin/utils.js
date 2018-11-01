import React from "react";

export const DefaultRenderNode = props => {
  const { attributes, children, node } = props;
  const level = node.data.get("level");
  const Tag = `h${level}`;
  return <Tag {...attributes}>{children}</Tag>;
};

const defaultAfterChange = (change, event, matches, afterOffset) => {
  const [hashes] = matches.before;
  const level = hashes.length;
  change.moveTo(afterOffset).setBlocks({ type: "h", data: { level } });
};

export const defaultNodeType = "h";
export const defaultCommand = "addHeadingBlock";
export const defaultMarkdown = {
  trigger: "space",
  before: /^(#{1,6})$/,
  afterChange: defaultAfterChange
};
