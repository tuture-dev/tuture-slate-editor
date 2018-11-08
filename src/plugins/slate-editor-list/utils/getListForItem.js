import isList from "./isList";

function getListForItem(options, value, item) {
  const { document } = value;
  const parent = document.getParent(item.key);
  return parent && isList(options, parent) ? parent : null;
}

export default getListForItem;
