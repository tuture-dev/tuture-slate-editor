import React from "react";
import styled from "styled-components";
import { Menu, Dropdown, Icon, Popover, Input, Button } from "antd";
import { getVisibleSelectionRect } from "get-selection-range";

import { AddHotKey, RenderNode, AutoReplace } from "../slate-editor-utils/";
import PasteLink from "./paste-link";

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const Link = styled("a")`
  &:hover {
    cursor: inherit;
  }
`;

class DefaultRenderNode extends React.Component {
  state = {
    visible: false,
    value: this.props.node.data.get("url"),
    editable: !this.props.node.data.get("url")
  };
  popoverRef = React.createRef();
  inputRef = React.createRef();

  componentDidMount() {
    const { attributes, children, node } = this.props;
    const url = node.data.get("url");
    console.log("url", url);

    if (!url) {
      this.setState({
        visible: true
      });
    }
  }

  onVisibleChange = visible => {
    this.setState({
      visible
    });
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSave = () => {
    const { value } = this.state;
    const { node, editor } = this.props;
    this.setState({
      visible: false,
      editable: false
    });
    editor.setNodeByKey(node.key, { data: { url: value } });
  };

  handleModify = () => {
    this.setState({
      editable: true
    });
  };

  handleDelete = () => {
    const { node, editor } = this.props;
    editor.unwrapInlineByKey(node.key);
  };

  render() {
    const { attributes, children, node } = this.props;
    const content = (
      <div>
        <Input
          autoFocus={true}
          onChange={this.onChange}
          value={this.state.value}
        />
        <Button type="default" onClick={this.handleSave}>
          保存
        </Button>
      </div>
    );

    const savedContent = (
      <div>
        <span>{this.state.value}</span>
        <Button onClick={this.handleModify}>修改</Button>
        <Button onClick={this.handleDelete}>删除</Button>
      </div>
    );

    return (
      <Popover
        trigger={"click"}
        content={this.state.editable ? content : savedContent}
        placement="bottomLeft"
        arrowPointAtCenter={true}
        visible={this.state.visible}
        ref={this.popoverRef}
        onVisibleChange={this.onVisibleChange}
      >
        <Link {...attributes} href={this.state.resValue}>
          {children}
        </Link>
      </Popover>
    );
  }
}

const defaultBeforeChange = nodeType => (change, event, matches) => {
  const startOffset = change.value.selection.start.offset;
  change
    .moveAnchorTo(startOffset - matches.before[0].length)
    .moveFocusTo(startOffset)
    .toggleMark(nodeType);
};

const defaultAfterChange = nodeType => (
  change,
  event,
  matches,
  afterOffset
) => {
  change.moveTo(afterOffset).toggleMark(nodeType);
};

const defaultNodeType = "link";
const defaultCommand = "addLink";
const defaultHotKey = "mod+k";
const defaultMarkdown = {
  trigger: /(\*|_)/,
  before: /((\*|_){2})[^(\*|_)]*((\*|_){1})/i,
  beforeChange: defaultBeforeChange(defaultNodeType),
  afterChange: defaultAfterChange(defaultNodeType)
};

export default function({
  hotKey = defaultHotKey,
  command = defaultCommand,
  nodeType = defaultNodeType,
  markdown = defaultMarkdown,
  renderNode
} = {}) {
  // The hotkey plugin
  // AddHotKey({
  //   hotKey,
  //   command,
  //   nodeType
  // }),
  let plugins = [PasteLink()];

  // Judge whether user offset renderNode
  if (renderNode) {
    plugins.push({
      renderNode
    });
  } else {
    plugins.push(
      RenderNode({
        nodeType: nodeType,
        element: DefaultRenderNode
      })
    );
  }

  // handle commands and query
  plugins.push({
    commands: {
      wrapLink(editor, url) {
        editor.command(command, url);
      },
      unwrapLink(editor) {
        editor.command(command);
      },
      [command](editor, url) {
        const { value } = editor;
        if (editor.query("isLinkAcitve", value)) {
          return editor.unwrapInline("link");
        }
        return editor.wrapInline({ type: "link", data: { url } });
      }
    },
    queries: {
      isLinkAcitve(editor, value) {
        const { inlines } = value;
        const active = inlines.some(i => i.type === "link");
        return active;
      }
    }
  });

  // Add markdown-related function
  plugins.push(AutoReplace(markdown));

  // return plugins stack
  return plugins;
}
