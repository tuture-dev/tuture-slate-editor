import Options from "./options";

import { wrapInList, unwrapList } from "./changes/";
import {
  isList,
  isSelectionInList,
  getCurrentItem,
  getItemsAtRange,
  getListForItem
} from "./utils/";

function core(optionParams) {
  const options = new Options(optionParams);

  return {
    utils: {
      isList: isList.bind(null, options),
      isSelectionInList: isSelectionInList.bind(null, options),
      getCurrentItem: getCurrentItem.bind(null, options),
      getItemsAtRange: getItemsAtRange.bind(null, options),
      getListForItem: getListForItem.bind(null, options)
    },
    changes: {
      wrapInList: wrapInList.bind(null, options),
      unwrapList: unwrapList.bind(null, options)
    }
  };
}

export default core;
