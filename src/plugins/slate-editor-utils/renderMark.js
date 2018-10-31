import React from "react";

export default function(options) {
  return {
    renderMark: (props, editor, next) => {
      switch (props.mark.type) {
        case options.markType:
          return <options.element {...props} />;
        default:
          return next();
      }
    }
  };
}
