import React from "react";

import { RenderNode, AutoReplace } from "../slate-editor-utils/";
import {
  DefaultRenderNode,
  defaultNodeType,
  defaultCommand,
  defaultMarkdown
} from "./utils";
import onBackspace from "./onBackspace";
import onEnter from "./onEnter";

export default function({
  command = defaultCommand,
  nodeType = defaultNodeType,
  markdown = defaultMarkdown,
  renderNode
} = {}) {
  let plugins = [];
  plugins.push({
    commands: {
      [command]: (editor, level) => {
        const isActive = editor.value.blocks.some(block => block.type === "h");
        editor
          .setBlocks(isActive ? "paragraph" : { type: "h", data: { level } })
          .focus();
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
        nodeType: nodeType,
        element: DefaultRenderNode
      })
    );
  }

  // handle Enter and Backspace

  plugins.push({
    onKeyDown: (event, editor, next) => {
      switch (event.key) {
        case "Enter":
          return onEnter(event, editor, next);
        case "Backspace":
          return onBackspace(event, editor, next);
        default:
          return next();
      }
    }
  });

  // Add markdown-related function
  plugins.push(AutoReplace(markdown));

  // return plugins stack
  return plugins;
}
