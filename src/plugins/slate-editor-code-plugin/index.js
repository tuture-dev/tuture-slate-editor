import React from "react";
import styled from "styled-components";

import { AddHotKey, RenderMark, AutoReplace } from "../slate-editor-utils/";

const Code = styled("code")`
  -webkit-box-decoration-break: clone;
  display: inline-block;
  font-family: "Source Code Pro", Menlo, monospace;
  font-size: 85%;
  background-color: rgb(245, 247, 249);
  border-radius: 3px;
  padding: 3px 6px;
  margin: 0px 1px;
`;

const DefaultRenderMark = props => {
  const { attributes, children } = props;
  return <Code {...attributes}>{children}</Code>;
};

const defaultBeforeChange = markType => (change, event, matches) => {
  const startOffset = change.value.selection.start.offset;
  change
    .moveAnchorTo(startOffset - matches.before[0].length)
    .moveFocusTo(startOffset)
    .toggleMark(markType);
};

const defaultAfterChange = markType => (
  change,
  event,
  matches,
  afterOffset
) => {
  change.moveTo(afterOffset).toggleMark(markType);
};

const defaultMarkType = "code";
const defaultCommand = "addCodeMark";
const defaultHotKey = "mod+shift+5";
const defaultMarkdown = {
  trigger: /`/,
  before: /(`)[^`]+/i,
  beforeChange: defaultBeforeChange(defaultMarkType),
  afterChange: defaultAfterChange(defaultMarkType)
};

export default function({
  hotKey = defaultHotKey,
  command = defaultCommand,
  markType = defaultMarkType,
  markdown = defaultMarkdown,
  renderMark
} = {}) {
  // The hotkey plugin
  let plugins = [
    AddHotKey({
      hotKey,
      command,
      markType
    })
  ];

  // Judge whether user offset renderMark
  if (renderMark) {
    plugins.push({
      renderMark
    });
  } else {
    plugins.push(
      RenderMark({
        markType: markType,
        element: DefaultRenderMark
      })
    );
  }

  // Add markdown-related function
  plugins.push(AutoReplace(markdown));

  // return plugins stack
  return plugins;
}
