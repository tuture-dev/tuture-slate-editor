import Options from "./options";
import { deserializeCode, isInCodeBlock } from "./utils/";
import { wrapCodeBlock, wrapCodeBlockByKey } from "./changes/";

function core(optionsParams) {
  const options = new Options(optionsParams);

  return {
    changes: {
      wrapCodeBlock: wrapCodeBlock.bind(null, options),
      wrapCodeBlockByKey: wrapCodeBlockByKey.bind(null, options)
    },
    utils: {
      isInCodeBlock: isInCodeBlock.bind(null, options),
      deserializeCode: deserializeCode.bind(null, options)
    }
  };
}

export default core;
