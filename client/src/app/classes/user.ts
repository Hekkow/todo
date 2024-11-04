import {Item} from './item';

export interface IUser {
  userID: number;
  username: string;
  items: Item[];
  modified: number;
  getItemIndex(itemID: number): number;
  addItem(item: Item): void;
  removeItem(itemID: number): void;
  removeItemLocal(itemID: number): void;
  editItem(itemID: number, itemText: string): void;
  setLocal(itemID: number, local: boolean): void;
  updateItemID(oldItemID: number, newItemID: number): void;
  latestItemID(): number;
  toJSON(): string;
  fromJSON(jsonString: string): User;
  fromObject(obj: object): User;
}
export class User implements IUser {
  userID: number;
  username: string;
  items: Item[];
  modified: number;
  constructor(userID: number = -1, username: string = "", items: Item[] = []) {
    this.userID = userID;
    this.username = username;
    this.items = items;
    this.modified = Date.now();
  }
  getItemIndex(itemID: number): number {
    return this.items.findIndex(i => i.itemID === itemID)
  }
  public addItem(item: Item) {
    this.items.push(item);
    this.modified = Date.now();
  }
  public removeItem(itemID: number) {
    this.items.splice(this.getItemIndex(itemID), 1)
    this.modified = Date.now();
  }
  public removeItemLocal(itemID: number) {
    this.items[this.getItemIndex(itemID)].itemID *= -1;
    // this.items.splice(this.getItemIndex(itemID), 1)
    this.modified = Date.now();
  }
  public editItem(itemID: number, itemText: string) {
    let index = this.getItemIndex(itemID)
    this.items[index].itemText = itemText;
    this.items[index].local = true;
    this.modified = Date.now();
  }
  public setLocal(itemID: number, local: boolean) {
    let index = this.getItemIndex(itemID)
    this.items[index].local = local;
  }
  public updateItemID(oldItemID: number, newItemID: number) {
    let index = this.getItemIndex(oldItemID)
    this.items[index].itemID = newItemID;
    this.items[index].local = false;
    this.modified = Date.now();
  }
  public latestItemID(): number {
    if (this.items.length === 0) return 1;
    return Math.max(...this.items.map(item => item.itemID)) + 1
  }

  toJSON(): string {
    let json = JSON.stringify({
      userID: this.userID,
      username: this.username,
      items: this.items
    });
    return json;
  }
  fromJSON(jsonString: string): User {
    Object.assign(this, JSON.parse(jsonString));
    return this;
  }
  fromObject(obj: object): User {
    Object.assign(this, obj);
    return this;
  }
}
