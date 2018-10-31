import Has from "lodash.has";
import React from "react";

import isHotKey from "is-hotkey";

export default function(options) {
  return {
    onKeyDown(event, editor, next) {
      if (!Has(options, "hotKey")) {
        return next();
      }

      if (isHotKey(options.hotKey)(event)) {
        return editor.command(options.command);
      }

      return next();
    },
    commands: {
      [options.command]: editor => {
        editor.command("toggleMark", options.mark);
      }
    },
    renderMark(props, editor, next) {
      const { attributes, children, mark } = props;

      switch (mark.type) {
        case "italic":
          return <i {...attributes}>{children}</i>;
        default:
          return next();
      }
    }
  };
}
