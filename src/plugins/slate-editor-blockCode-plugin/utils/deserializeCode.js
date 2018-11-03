import { Block, Text } from "slate";
import { List } from "immutable";
import detectNewline from "detect-newline";

const DEFAULT_NEWLINE = "\n";

function deserializeCode(options, text) {
  const sep = detectNewline(text) || DEFAULT_NEWLINE;

  const lines = List(text.split(sep)).map(line =>
    Block.create({
      type: options.lineType,
      nodes: [Text.create(line)]
    })
  );

  const code = Block.create({
    type: options.containerType,
    nodes: lines
  });

  return code;
}

export default deserializeCode;
