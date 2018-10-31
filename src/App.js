import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";

import AddMark from "./plugins/slate-mark-plugin";

const plugins = [
  AddMark({
    command: "addBoldMark",
    hotKey: "mod+b",
    mark: "bold"
  }),
  AddMark({
    command: "addItalicMark",
    hotKey: "mod+i",
    mark: "italic"
  }),
  AddMark({
    command: "addUnderlineMark",
    hotKey: "mod+u",
    mark: "underline"
  }),
  AddMark({
    command: "addStrikethroughMark",
    hotKey: "mod+shift+x",
    mark: "strikethrough"
  }),
  AddMark({
    command: "addCodeMark",
    mark: "code"
  })
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

    this.editor.command(type).focus();
  };

  ref = editor => (this.editor = editor);
  render() {
    return (
      <div>
        <button onClick={event => this.handleMarkClick(event, "addBoldMark")}>
          加粗
        </button>
        <button onClick={event => this.handleMarkClick(event, "addItalicMark")}>
          倾斜
        </button>
        <button
          onClick={event => this.handleMarkClick(event, "addUnderlineMark")}
        >
          下划线
        </button>
        <button
          onClick={event => this.handleMarkClick(event, "addStrikethroughMark")}
        >
          删除线
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
