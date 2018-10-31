import isHotKey from "is-hotkey";

export default function(options) {
  return {
    onKeyDown(event, editor, next) {
      if (isHotKey(options.hotKey)(event)) {
        return editor.command(options.command);
      }

      return next();
    },
    commands: {
      [options.command]: editor => {
        editor.command("toggleMark", options.markType).focus();
      }
    }
  };
}
