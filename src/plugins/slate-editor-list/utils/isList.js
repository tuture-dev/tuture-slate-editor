function isList(options, node) {
  return options.types.includes(node.type);
}

export default isList;
