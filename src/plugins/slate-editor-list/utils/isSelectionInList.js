import getItemsAtRange from "./getItemsAtRange";
import getListForItem from "./getListForItem";

function isSelectionInList(options, value, type) {
  const items = getItemsAtRange(options, value);

  return (
    !items.isEmpty() &&
    (!type ||
      getListForItem(options, value, items.first()).get("type") === type)
  );
}

export default isSelectionInList;
