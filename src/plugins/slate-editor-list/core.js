import Options from "./options";

import {
  wrapInList,
  unwrapList,
  increaseItemDepth,
  decreaseItemDepth,
  splitListItem
} from "./changes/";
import {
  isList,
  isSelectionInList,
  getCurrentItem,
  getItemsAtRange,
  getListForItem,
  getCurrentList,
  getPreviousItem
} from "./utils/";
import { schema, validateNode } from "./validation/";

function core(optionParams) {
  const options = new Options(optionParams);

  return {
    schema: schema(options),
    validateNode: validateNode(options),
    utils: {
      isList: isList.bind(null, options),
      isSelectionInList: isSelectionInList.bind(null, options),
      getCurrentItem: getCurrentItem.bind(null, options),
      getItemsAtRange: getItemsAtRange.bind(null, options),
      getListForItem: getListForItem.bind(null, options),
      getCurrentList: getCurrentList.bind(null, options),
      getPreviousItem: getPreviousItem.bind(null, options)
    },
    changes: {
      wrapInList: wrapInList.bind(null, optionParams),
      unwrapList: bindAndScopeChange(options, unwrapList),
      increaseItemDepth: bindAndScopeChange(options, increaseItemDepth),
      decreaseItemDepth: bindAndScopeChange(options, decreaseItemDepth),
      splitListItem: bindAndScopeChange(options, splitListItem)
    }
  };
}

function bindAndScopeChange(options, fn) {
  return (editor, ...args) => {
    const { value } = editor;

    if (!isSelectionInList(options, value)) {
      return editor;
    }

    return fn(...[options, editor].concat(args));
  };
}

export default core;
