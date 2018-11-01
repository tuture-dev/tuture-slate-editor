import React from "react";

import { RenderNode, AutoReplace } from "../slate-editor-utils/";

const DefaultRenderNode = props => {
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

const defaultNodeType = "h";
const defaultCommand = "addHeadingBlock";
const defaultMarkdown = {
  trigger: "space",
  before: /^(#{1,6})$/,
  afterChange: defaultAfterChange
};

export default function({
  command = defaultCommand,
  nodeType = defaultNodeType,
  markdown = defaultMarkdown,
  renderNode
} = {}) {
  let plugins = [];
  plugins.push({
    commands: {
      addHeadingBlock: (editor, level) => {
        editor.setBlocks({ type: "h", data: { level } });
      }
    }
  });

  // Judge whether user offset renderMark
  if (renderNode) {
    plugins.push({
      renderNode
    });
  } else {
    plugins.push(
      RenderNode({
        nodeType: defaultNodeType,
        element: DefaultRenderNode
      })
    );
  }

  // Add markdown-related function
  plugins.push(AutoReplace(markdown));

  // return plugins stack
  return plugins;
}
