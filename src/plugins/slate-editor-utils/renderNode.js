import React from "react";

export default function(options) {
  return {
    renderNode: (props, editor, next) => {
      switch (props.node.type) {
        case options.nodeType:
          return <options.element {...props} />;
        default:
          return next();
      }
    }
  };
}
