import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";

import BoldPlugin from "./plugins/slate-editor-bold-plugin/";
import ItalicPlugin from "./plugins/slate-editor-italic-plugin/";
import DeletePlugin from "./plugins/slate-editor-delete-plugin/";
import CodePlugin from "./plugins/slate-editor-code-plugin/";
import HeaderPlugin from "./plugins/slate-editor-header-plugin/";
import BlockquotePlugin from "./plugins/slate-editor-blockquote-plugin/";

console.log("he", HeaderPlugin());

const plugins = [
  ...BoldPlugin(),
  ...ItalicPlugin(),
  ...DeletePlugin(),
  ...CodePlugin(),
  ...HeaderPlugin(),
  ...BlockquotePlugin()
];

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        nodes: [
          {
            leaves: [
              {
                text: "Hello Tuture"
              }
            ],
            object: "text"
          }
        ],
        object: "block",
        type: "paragraph"
      }
    ]
  }
});

export default class App extends React.Component {
  state = {
    value: initialValue
  };

  onChange = ({ value }) => {
    this.setState({
      value
    });
  };

  handleMarkClick = (event, type) => {
    event.preventDefault();

    this.editor.command(type);
  };

  handleBlockClick = (event, type) => {
    event.preventDefault();

    switch (type) {
      case "heading-one":
        return this.editor.command("addHeadingBlock", 1);
      default:
        return this.editor.command(type);
    }
  };

  ref = editor => (this.editor = editor);
  render() {
    return (
      <div>
        <button onClick={event => this.handleMarkClick(event, "addBoldMark")}>
          加粗
        </button>
        <button onClick={event => this.handleMarkClick(event, "addItalicMark")}>
          斜体
        </button>
        <button onClick={event => this.handleMarkClick(event, "addDeleteMark")}>
          删除
        </button>
        <button onClick={event => this.handleMarkClick(event, "addCodeMark")}>
          代码
        </button>
        <button onClick={event => this.handleBlockClick(event, "heading-one")}>
          一级标题
        </button>
        <button
          onClick={event => this.handleBlockClick(event, "addBlockquoteBlock")}
        >
          添加引用
        </button>
        <Editor
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}
