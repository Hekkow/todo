export class Item {
  itemID: number;
  itemText: string;
  local: boolean;
  constructor(itemID: number, itemText: string, local: boolean = true) {
    this.itemID = itemID;
    this.itemText = itemText;
    this.local = local
  }
}
