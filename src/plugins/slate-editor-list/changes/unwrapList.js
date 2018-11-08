import { getItemsAtRange } from "../utils/";

function unwrapList(options, editor) {
  const items = getItemsAtRange(options, editor.value);

  if (items.isEmpty()) {
    return editor;
  }

  items.forEach(item => editor.unwrapNodeByKey(item.key, { normalize: false }));

  const firstItem = items.first();
  const parent = editor.value.document.getParent(firstItem.key);

  let index = parent.nodes.findIndex(node => node.key === firstItem.key);

  items.forEach(item => {
    item.nodes.forEach(node => {
      editor.moveNodeByKey(node.key, parent.key, index, {
        normalize: false
      });
      index += 1;
    });
  });

  items.forEach(item => editor.removeNodeByKey(item.key, { normalzie: false }));

  return editor;
}

export default unwrapList;
