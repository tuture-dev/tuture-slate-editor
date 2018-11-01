import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";

import BoldPlugin from "./plugins/slate-editor-bold-plugin/";
import ItalicPlugin from "./plugins/slate-editor-italic-plugin/";
import DeletePlugin from "./plugins/slate-editor-delete-plugin/";
import CodePlugin from "./plugins/slate-editor-code-plugin/";

const plugins = [
  ...BoldPlugin(),
  ...ItalicPlugin(),
  ...DeletePlugin(),
  ...CodePlugin()
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
