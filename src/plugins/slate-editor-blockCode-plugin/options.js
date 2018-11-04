import { Record } from "immutable";
import { Block, Text } from "slate";

import { getCurrentCode } from "./utils/";

const DEFAULTS = {
  containerType: "code_block",
  lineType: "code_line",
  exitBlockType: "paragraph",
  selectAll: true,
  allowMarks: false,
  getIndent: null,
  onExit: null
};

/**
 * The plugin options container
 */
class Options extends Record(DEFAULTS) {
  containerType;
  lineType;
  exitBlockType;
  selectAll;
  allowMarks;
  getIndent;
  onExit;

  resolveOnExit(editor) {
    if (this.onExit) {
      return this.onExit(editor);
    }

    // Exit the code block
    const codeBlock = getCurrentCode(
      { containerType: "code_block" },
      editor.value
    );
    editor.moveToEndOfNode(codeBlock);

    const range = editor.value.selection;

    const exitBlock = Block.create({
      type: this.exitBlockType,
      nodes: [Text.create()]
    });

    editor.deleteAtRange(range, { normalize: false });
    editor.insertBlockAtRange(editor.value.selection, exitBlock, {
      normalize: false
    });

    return editor.unwrapNodeByKey(exitBlock.key).moveToStartOfNode(exitBlock);
  }
}

export default Options;
