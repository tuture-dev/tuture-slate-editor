import getCurrentItem from "./getCurrentItem";
import getListForItem from "./getListForItem";

function getCurrentList(options, value, block) {
  const item = getCurrentItem(options, value, block);

  if (!item) {
    return null;
  }

  return getListForItem(options, value, item);
}

export default getCurrentList;
