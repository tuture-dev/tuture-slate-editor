import React from "react";
import Has from "lodash.has";

import AddHotKey from "../slate-editor-utils/addHotKey";
import RenderMark from "../slate-editor-utils/renderMark";

const DefaultRenderMark = props => {
  const { attributes, children } = props;
  return <strong {...attributes}>{children}</strong>;
};

export default function({
  hotKey = "mod+b",
  command = "addBoldMark",
  markType = "bold",
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

  // return plugins stack
  return plugins;
}
