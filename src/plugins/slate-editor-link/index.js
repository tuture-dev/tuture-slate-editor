import React from "react";

import { AddHotKey, RenderNode, AutoReplace } from "../slate-editor-utils/";
import PasteLink from "./paste-link";

const DefaultRenderNode = props => {
  const { attributes, children, node } = props;
  return (
    <a {...attributes} href={node.data.get("url")}>
      {children}
    </a>
  );
};

const defaultBeforeChange = nodeType => (change, event, matches) => {
  const startOffset = change.value.selection.start.offset;
  change
    .moveAnchorTo(startOffset - matches.before[0].length)
    .moveFocusTo(startOffset)
    .toggleMark(nodeType);
};

const defaultAfterChange = nodeType => (
  change,
  event,
  matches,
  afterOffset
) => {
  change.moveTo(afterOffset).toggleMark(nodeType);
};

const defaultNodeType = "link";
const defaultCommand = "addLinkInline";
const defaultHotKey = "mod+k";
const defaultMarkdown = {
  trigger: /(\*|_)/,
  before: /((\*|_){2})[^(\*|_)]*((\*|_){1})/i,
  beforeChange: defaultBeforeChange(defaultNodeType),
  afterChange: defaultAfterChange(defaultNodeType)
};

export default function({
  hotKey = defaultHotKey,
  command = defaultCommand,
  nodeType = defaultNodeType,
  markdown = defaultMarkdown,
  renderNode
} = {}) {
  // The hotkey plugin
  // AddHotKey({
  //   hotKey,
  //   command,
  //   nodeType
  // }),
  let plugins = [PasteLink()];

  // Judge whether user offset renderNode
  if (renderNode) {
    plugins.push({
      renderNode
    });
  } else {
    plugins.push(
      RenderNode({
        nodeType: nodeType,
        element: DefaultRenderNode
      })
    );
  }

  // handle commands and query
  plugins.push({
    commands: {
      wrapLink(editor, url) {
        editor.command(command, url);
      },
      unwrapLink(editor) {
        editor.command(command);
      },
      [command](editor, url) {
        const { value } = editor;
        if (editor.query("isActiveQuery", value)) {
          return editor.unwrapInline("link");
        }
        return editor.wrapInline({ type: "link", data: { url } });
      }
    },
    queries: {
      isLinkAcitve(editor, value) {
        const { inlines } = value;
        const active = inlines.some(i => i.type === "link");
        return active;
      }
    }
  });

  // Add markdown-related function
  plugins.push(AutoReplace(markdown));

  // return plugins stack
  return plugins;
}
