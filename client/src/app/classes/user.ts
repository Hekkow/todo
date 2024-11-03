import {Item} from './item';

export interface IUser {
  userID: number;
  username: string;
  items: Item[];
  getItemIndex(itemID: number): number;
  addItem(item: Item): void;
  removeItem(itemID: number): void;
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
  constructor(userID: number = -1, username: string = "", items: Item[] = []) {
    this.userID = userID;
    this.username = username;
    this.items = items;
  }
  getItemIndex(itemID: number): number {
    return this.items.findIndex(i => i.itemID === itemID)
  }
  public addItem(item: Item) {
    this.items.push(item);
  }
  public removeItem(itemID: number) {
    this.items.splice(this.getItemIndex(itemID), 1)
  }
  public updateItemID(oldItemID: number, newItemID: number) {
    this.items[this.getItemIndex(oldItemID)].itemID = newItemID;
  }
  public latestItemID(): number {
    if (this.items.length === 0) return 0;
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
