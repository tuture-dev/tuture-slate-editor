import { Record } from "immutable";
import { Block, Text } from "slate";

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

    const range = editor.value.selection;

    const exitBlock = Block.create({
      type: this.exitBlockType,
      nodes: [Text.create()]
    });

    editor.deleteAtRange(range, { normalize: false });
    editor.insertBlockAtRange(editor.value.selection, exitBlock, {
      normalize: false
    });

    // Exit the code block
    editor.unwrapNodeByKey(exitBlock.key);

    return editor.moveToStartOfNode(exitBlock);
  }
}

export default Options;
