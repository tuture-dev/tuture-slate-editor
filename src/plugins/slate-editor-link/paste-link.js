import isUrl from "is-url";

export default function PasteLinkify(options = {}) {
  const {
    isActiveQuery = "isLinkActive",
    wrapCommand = "wrapLink",
    unwrapCommand = "unwrapLink"
  } = options;

  return {
    onCommand(command, editor, next) {
      const { type, args } = command;
      const { value } = editor;
      const { selection } = value;
      const { isCollapsed, start } = selection;
      let url;

      if (
        (type === "insertText" && isUrl((url = args[0]))) ||
        (type === "insertFragment" && isUrl((url = args[0].text)))
      ) {
        if (editor.query(isActiveQuery, value)) {
          editor.command(unwrapCommand);
        }

        if (isCollapsed) {
          next();
          editor
            .moveAnchorTo(start.offset)
            .moveFocusTo(start.offset + url.length);
        }

        editor.command(wrapCommand, url).moveToEnd();
        return;
      }

      next();
    }
  };
}
