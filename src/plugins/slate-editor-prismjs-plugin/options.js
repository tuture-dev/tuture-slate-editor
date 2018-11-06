import React from "react";
import { Record } from "immutable";

import TOKEN_MARK from "./constants";

function defaultOnlyIn(node) {
  return node.object === "block" && node.type === "code_block";
}

function defaultGetSyntax(node) {
  return node.data.get("syntax");
}

function defaultRenderMark(props, editor, next) {
  const { mark, children, attributes } = props;
  if (mark.type !== TOKEN_MARK) {
    return next();
  }

  const className = mark.data.get("className");
  console.log("hello", className);
  return (
    <span {...attributes} className={className}>
      {children}
    </span>
  );
}

class Options extends Record({
  onlyIn: defaultOnlyIn,
  getSyntax: defaultGetSyntax,
  renderMark: defaultRenderMark
}) {}

export default Options;
