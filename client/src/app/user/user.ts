import {Item} from '../item/item';

export class User {
  userID: number;
  username: string;
  items: Map<number, Item>;
  constructor(userID: number = -1, username: string = "", items: Map<number, Item> = new Map<number, Item>()) {
    this.userID = userID;
    this.username = username;
    this.items = items;
  }
}
