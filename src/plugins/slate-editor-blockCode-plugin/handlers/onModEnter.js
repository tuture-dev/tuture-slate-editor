function onModEnter(options, event, editor, next) {
  const { selection } = editor.value;

  if (!selection.isCollapsed) {
    return next();
  }

  event.preventDefault();

  return options.resolveOnExit(editor);
}

export default onModEnter;
