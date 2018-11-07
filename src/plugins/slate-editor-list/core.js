import Options from "./options";

import { wrapInList } from "./changes/";
import { isList } from "./utils/";

function core(optionParams) {
  const options = new Options(optionParams);

  return {
    utils: {
      isList: isList.bind(null, options)
    },
    changes: {
      wrapInList: wrapInList.bind(null, options)
    }
  };
}

export default core;
