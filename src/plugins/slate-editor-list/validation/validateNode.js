import { isList } from "../utils/";

function validateNode(options) {
  return node => joinAdjacentLists(options, node);
}

function joinAdjacentLists(options, node) {
  if (node.object !== "document" && node.object !== "block") {
    return undefined;
  }

  const invalids = node.nodes
    .map((child, i) => {
      if (!isList(options, child)) {
        return null;

        const next = node.nodes.get(i + 1);
        if (!next || !isList(options, next) || !options.canMerge(child, next)) {
          return null;
        }

        return [child, next];
      }
    })
    .filter(Boolean);

  if (invalids.isEmpty()) {
    return undefined;
  }

  return editor => {
    invalids.reverse().forEach(pair => {
      const [first, second] = pair;
      const updatedSecond = editor.value.document.getDescendant(second.key);
      updatedSecond.nodes.forEach((secondNode, index) => {
        editor.moveNodeByKey(
          secondNode.key,
          first.key,
          first.nodes.size + index,
          { normalize: false }
        );
      });

      editor.removeNodeByKey(second.key, { normalize: false });
    });
  };
}

export default validateNode;
