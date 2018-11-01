import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";

import BoldPlugin from "./plugins/slate-editor-bold-plugin/";
import ItalicPlugin from "./plugins/slate-editor-italic-plugin/";

const plugins = [...BoldPlugin(), ...ItalicPlugin()];

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
