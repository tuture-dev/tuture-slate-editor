import React from "react";
import isHotKey from "is-hotkey";

import { RenderNode, AutoReplace } from "../slate-editor-utils/";
import {
  DefaultRenderNode,
  defaultNodeType,
  defaultCommand,
  defaultMarkdown,
  DefaultLineNode
} from "./utils";
import { isSelectionInBlock } from "./getCurrentBlock";
import { getCurrentCode } from "./utils/";
import Options from "./options";
import core from "./core";
import {
  onTab,
  onShiftTab,
  onModEnter,
  onEnter,
  onSelectAll,
  onBackspace
} from "./handlers/";

const isTab = isHotKey("tab");
const isShiftTab = isHotKey("shift+tab");
const isModEnter = isHotKey("mod+enter");
const isEnter = isHotKey("enter");
const isModA = isHotKey("mod+a");
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
        const isActive = corePlugin.utils.isInCodeBlock(editor.value);
        console.log("isActive", isActive);
        return isActive
          ? editor.unwrapBlock("block_code").focus()
          : corePlugin.changes.wrapCodeBlock(editor);
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
        nodeType: options.containerType,
        element: DefaultRenderNode
      })
    );
    plugins.push(
      RenderNode({
        nodeType: options.lineType,
        element: DefaultLineNode
      })
    );
  }

  // handle Enter and Backspace

  plugins.push({
    onKeyDown: (event, editor, next) => {
      const currentCode = getCurrentCode(options, editor.value);

      if (!currentCode) {
        return next();
      }

      const args = [options, event, editor, next];

      if (isTab(event)) {
        return onTab(...args);
      }

      if (isShiftTab(event)) {
        return onShiftTab(...args);
      }

      if (options.exitBlockType && isModEnter(event)) {
        return onModEnter(...args);
      }

      if (isEnter(event)) {
        return onEnter(...args);
      }

      if (options.selectAll && isModA(event)) {
        return onSelectAll(...args);
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
