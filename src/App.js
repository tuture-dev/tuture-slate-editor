import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";

import BoldPlugin from "./plugins/slate-editor-bold-plugin/";
import ItalicPlugin from "./plugins/slate-editor-italic-plugin/";
import DeletePlugin from "./plugins/slate-editor-delete-plugin/";
import CodePlugin from "./plugins/slate-editor-code-plugin/";
import HeaderPlugin from "./plugins/slate-editor-header-plugin/";
import BlockquotePlugin from "./plugins/slate-editor-blockquote-plugin/";
import BlockCodePlugin, {
  corePlugin
} from "./plugins/slate-editor-blockCode-plugin/";
import PrismPlugin from "./plugins/slate-editor-prismjs-plugin/";
import ListPlugin from "./plugins/slate-editor-list/";
import LinkPlugin from "./plugins/slate-editor-link/";

import "prismjs/themes/prism.css";
import "github-markdown-css";

const afterChange = (editor, event, matches, afterOffset) => {
  return editor.moveTo(afterOffset).command("addOlList");
};

const OlMarkdown = {
  trigger: "space",
  before: /^([1-9]\.)$/,
  afterChange: afterChange
};

const plugins = [
  ...BoldPlugin(),
  ...ItalicPlugin(),
  ...DeletePlugin(),
  ...CodePlugin(),
  ...HeaderPlugin(),
  ...BlockquotePlugin(),
  PrismPlugin(),
  ...BlockCodePlugin(),
  ...ListPlugin({ nodeType: "ul_list" }),
  ...ListPlugin({
    nodeType: "ol_list",
    markdown: OlMarkdown,
    command: "addOlList"
  }),
  ...LinkPlugin()
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
      case "addBlockCode":
        return this.editor.command("addBlockCode");
      default:
        return this.editor.command(type);
    }
  };

  renderNode = (props, editor, next) => {
    const { node, attributes, children } = props;

    switch (node.type) {
      case "paragraph":
        return <p {...attributes}>{children}</p>;
      default:
        return next();
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
        <button onClick={event => this.handleBlockClick(event, "addBlockCode")}>
          添加代码块
        </button>
        <button onClick={event => this.handleBlockClick(event, "addOlList")}>
          添加有序列表
        </button>
        <button onClick={event => this.handleBlockClick(event, "addUlList")}>
          添加无序列表
        </button>
        <Editor
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          plugins={plugins}
          renderNode={this.renderNode}
        />
      </div>
    );
  }
}
