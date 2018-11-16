import React from "react";
import styled from "styled-components";
import { Menu, Dropdown, Icon } from "antd";
import { getVisibleSelectionRect } from "get-selection-range";

import { AddHotKey, RenderNode, AutoReplace } from "../slate-editor-utils/";
import PasteLink from "./paste-link";

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const Link = styled("a")`
  &:hover {
    cursor: inherit;
  }
`;

const DefaultRenderNode = props => {
  const { attributes, children, node } = props;
  console.log("hello");
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Link {...attributes} href={node.data.get("url")}>
        {children}
      </Link>
    </Dropdown>
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
