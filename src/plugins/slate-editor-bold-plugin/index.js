import React from "react";

import { AddHotKey, RenderMark, AutoReplace } from "../slate-editor-utils/";

const DefaultRenderMark = props => {
  const { attributes, children } = props;
  return <strong {...attributes}>{children}</strong>;
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

const defaultMarkType = "bold";
const defaultCommand = "addBoldMark";
const defaultHotKey = "mod+b";
const defaultMarkdown = {
  trigger: /(\*|_)/,
  before: /((\*|_){2})[^(\*|_)]*((\*|_){1})/i,
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
