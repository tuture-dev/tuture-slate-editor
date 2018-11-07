import { Record } from "immutable";

const DEFAULT = {
  types: ["ul_list", "ol_list"],
  typeItem: "list_item",
  typeDefault: "paragraph",
  canMerge: (a, b) => a.type === b.type
};

class Options extends Record(DEFAULT) {
  types;
  typeItem;
  typeDefault;
  canMerge;
}

export default Options;
