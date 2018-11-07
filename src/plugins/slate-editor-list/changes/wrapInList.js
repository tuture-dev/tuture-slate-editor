import { Data } from "slate";
import { List } from "immutable";

import { isList } from "../utils/";

function wrapInList(options, editor, type, data) {
  const selectedBlocks = getHighestSelectedBlocks(editor.value);
  type = type || options.types[0];

  editor.wrapBlock(
    {
      type,
      data: Data.create(data)
    },
    { normalize: false }
  );

  selectedBlocks.forEach(node => {
    if (isList(options, node)) {
      node.nodes.forEach(({ key }) =>
        editor.unwrapNodeByKey(key, { normalize: false })
      );
    } else {
      editor.wrapBlockByKey(node.key, options.typeItem, {
        normalize: false
      });
    }
  });

  return editor.normalize();
}

function getHighestSelectedBlocks(value) {
  const range = value.selection;
  const { document } = value;

  const startBlock = document.getClosestBlock(range.start.key);
  const endBlock = document.getClosestBlock(range.end.key);

  if (startBlock === endBlock) {
    return List([startBlock]);
  }

  const ancester = document.getCommonAncester(startBlock.key, endBlock.key);
  const startPath = ancester.getPath(startBlock.key);
  const endPath = ancester.getPath(endBlock.key);

  return ancester.nodes.slice(startPath[0], endPath[0] + 1);
}

export default wrapInList;
