import React from "react";

import { AddHotKey, RenderMark, AutoReplace } from "../slate-editor-utils/";

const DefaultRenderMark = props => {
  const { attributes, children } = props;
  return <i {...attributes}>{children}</i>;
};

const defaultBeforeChange = markType => (change, event, matches) => {
  const startOffset = change.value.selection.start.offset;
  console.log("matches", matches, startOffset);
  change
    .moveAnchorTo(startOffset - matches.before[0].length + 1)
    .moveFocusTo(startOffset)
    .toggleMark(markType);
};

const defaultAfterChange = markType => (
  change,
  event,
  matches,
  afterOffset
) => {
  console.log("matches", matches, afterOffset);
  change.moveTo(afterOffset).toggleMark(markType);
};

const defaultMarkType = "italic";
const defaultCommand = "addItalicMark";
const defaultHotKey = "mod+i";
const defaultMarkdown = {
  trigger: /(\*|_)/,
  before: /[^(\*|_)](\*|_)[^(\*|_)]+/i,
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
