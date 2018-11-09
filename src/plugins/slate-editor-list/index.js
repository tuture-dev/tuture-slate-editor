import React from "react";
import isHotKey from "is-hotkey";

import { RenderNode, AutoReplace } from "../slate-editor-utils/";
import {
  defaultNodeType,
  defaultCommand,
  defaultMarkdown,
  DefaultListItemNode,
  DefaultRenderOlNode,
  DefaultRenderUlNode
} from "./utils";
import Options from "./options";
import core from "./core";
import { onBackspace, onEnter, onTab, onShiftTab } from "./handlers/";

const isTab = isHotKey("tab");
const isShiftTab = isHotKey("shift+tab");
const isEnter = isHotKey("enter");
const isBackspace = isHotKey("backspace");

const options = new Options();
export const corePlugin = core(options);

export default function({
  command = defaultCommand,
  nodeType = defaultNodeType,
  markdown = defaultMarkdown,
  renderNode
} = {}) {
  let plugins = [];
  plugins.push({
    commands: {
      [command]: editor => {
        const { value } = editor;
        const isActive = corePlugin.utils.isSelectionInList(value, nodeType);
        return corePlugin.changes[isActive ? "unwrapList" : "wrapInList"](
          editor,
          nodeType
        ).focus();
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
        nodeType: options.types[0],
        element: DefaultRenderUlNode
      })
    );
    plugins.push(
      RenderNode({
        nodeType: options.types[1],
        element: DefaultRenderOlNode
      })
    );
    plugins.push(
      RenderNode({
        nodeType: options.typeItem,
        element: DefaultListItemNode
      })
    );
  }

  plugins.push({
    schema: corePlugin.schema,
    validateNode: corePlugin.validateNode,
    onKeyDown: (event, editor, next) => {
      const args = [options, event, editor, next];

      if (isTab(event)) {
        return onTab(...args);
      }

      if (isShiftTab(event)) {
        return onShiftTab(...args);
      }

      if (isEnter(event)) {
        return onEnter(...args);
      }

      if (isBackspace(event)) {
        return onBackspace(...args);
      }

      return next();
    }
  });

  // Add markdown-related function
  plugins.push(AutoReplace(markdown));

  // return plugins stack
  return plugins;
}
