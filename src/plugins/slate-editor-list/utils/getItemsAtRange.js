import { List } from "immutable";

import isList from "./isList";
import getCurrentItem from "./getCurrentItem";

function getItemsAtRange(options, value, range) {
  range = range || value.selection;

  if (!range.start.key) {
    return List();
  }

  const { document } = value;

  const startBlock = document.getClosestBlock(range.start.key);
  const endBlock = document.getClosestBlock(range.end.key);

  if (startBlock === endBlock) {
    const item = getCurrentItem(options, value, startBlock);
    return item ? List([item]) : List();
  }

  const ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);

  if (isList(options, ancestor)) {
    const startPath = ancestor.getPath(startBlock.key);
    const endPath = ancestor.getPath(endBlock.key);

    return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
  } else if (ancestor.type === options.typeItem) {
    return List([ancestor]);
  }

  return List();
}

export default getItemsAtRange;
