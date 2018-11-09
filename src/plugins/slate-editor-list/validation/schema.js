import {
  PARENT_TYPE_INVALID,
  CHILD_OBJECT_INVALID,
  CHILD_TYPE_INVALID
} from "../../slate-schema-violations/";

function schema(options) {
  const constructedSchema = {
    blocks: {
      [options.typeItem]: {
        parent: { types: options.types },
        nodes: [{ objects: ["block"] }],
        normalize: normalize({
          [PARENT_TYPE_INVALID]: (editor, error) =>
            editor.unwrapNodeByKey(error.node.key, {
              normalize: false
            }),
          [CHILD_OBJECT_INVALID]: (editor, error) =>
            wrapChildrenInDefaultBlock(options, editor, error.node)
        })
      }
    }
  };

  options.types.forEach(type => {
    constructedSchema.blocks[type] = {
      nodes: [{ types: [options.typeItem] }],
      normalzie: normalize({
        [CHILD_TYPE_INVALID]: (editor, error) =>
          editor.wrapBlockByKey(error.child.key, options.typeItem, {
            normalize: false
          })
      })
    };
  });

  return constructedSchema;
}

function normalize(reasons) {
  return (editor, reason, error) => {
    const reasonFn = reasons[reason];
    if (reasonFn) {
      reasonFn(editor, error);
    }
  };
}

function wrapChildrenInDefaultBlock(options, editor, node) {
  editor.wrapBlockByKey(node.nodes.first().key, options.typeDefault, {
    normalize: false
  });

  const wrapper = editor.value.document.getDescendant(node.key).nodes.first();

  node.nodes.rest().forEach((child, index) =>
    editor.moveNodeByKey(child.key, wrapper.key, index + 1, {
      normalize: false
    })
  );

  return editor;
}

export default schema;
