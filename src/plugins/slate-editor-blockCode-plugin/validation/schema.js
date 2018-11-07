import { List } from "immutable";
import { Block } from "slate";

import {
  CHILD_TYPE_INVALID,
  PARENT_TYPE_INVALID
} from "../../slate-schema-violations/";
import { deserializeCode } from "../utils/";

function schema(options) {
  const baseSchema = {
    blocks: {
      [options.containerType]: {
        nodes: [{ types: [options.lineType] }],
        normalize: (editor, error) => {
          if (error.code === CHILD_TYPE_INVALID) {
            return onlyLine(options, editor, error);
          }
        }
      },
      [options.lineType]: {
        nodes: [{ objects: ["text"], min: 1 }],
        parent: { types: [options.containerType] },
        normalize: (editor, error) => {
          if (error.code === PARENT_TYPE_INVALID) {
            return noOrphanLine(options, editor, error);
          }
        }
      }
    }
  };

  if (!options.allowMarks) {
    baseSchema.blocks[options.lineType].marks = [];
  }

  return baseSchema;
}

function getSuccessiveNodes(nodes, match) {
  const nonLines = nodes.takeUntil(match);
  const afterNonLines = nodes.skip(nonLines.size);
  if (afterNonLines.isEmpty()) {
    return List();
  }

  const firstGroup = afterNonLines.takeWhile(match);
  const restOfNodes = afterNonLines.skip(firstGroup.size);

  return List([firstGroup]).concat(getSuccessiveNodes(restOfNodes, match));
}

function onlyLine(options, editor, error) {
  const isNotLine = n => n.type !== options.lineType;
  const nonLineGroups = getSuccessiveNodes(error.node.nodes, isNotLine);

  nonLineGroups.filter(group => !group.isEmpty()).forEach(nonLineGroup => {
    const text = nonLineGroup.map(n => n.text).join("");
    const codeLines = deserializeCode(options, text).nodes;

    const first = nonLineGroup.first();
    const parent = editor.value.document.getParent(first.key);
    const invalidNodeIndex = parent.nodes.indexOf(first);

    codeLines.forEach((codeLine, index) => {
      editor.insertNodeByKey(parent.key, invalidNodeIndex + index, codeLine, {
        normalize: false
      });
    });

    nonLineGroup.forEach(n =>
      editor.removeNodeByKey(n.key, { normalize: false })
    );

    return editor;
  });
}

function noOrphanLine(options, editor, error) {
  const { parent } = error;

  const isLine = n => n.type === options.lineType;

  const linesGroup = getSuccessiveNodes(parent.nodes, isLine);

  linesGroup.forEach(lineGroup => {
    const container = Block.create({ type: options.containerType, nodes: [] });
    const firstLineIndex = parent.nodes.indexOf(lineGroup.first());

    editor.insertNodeByKey(parent.key, firstLineIndex, container, {
      normalize: false
    });

    lineGroup.forEach((line, index) =>
      editor.moveNodeByKey(line.key, container.key, index, {
        normalize: false
      })
    );
  });
}

export default schema;
