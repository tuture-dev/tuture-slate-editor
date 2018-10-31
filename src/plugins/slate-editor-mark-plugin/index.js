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
        case "bold":
          return <strong {...attributes}>{children}</strong>;
        case "italic":
          return <i {...attributes}>{children}</i>;
        case "underline":
          return <u {...attributes}>{children}</u>;
        case "strikethrough":
          return <del {...attributes}>{children}</del>;
        case "code":
          return <code {...attributes}>{children}</code>;
        default:
          return next();
      }
    }
  };
}
