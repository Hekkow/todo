import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from './classes/item';
import {IUser, User} from './classes/user';
import {map, Observable} from 'rxjs';
@Injectable({providedIn: 'root'})
export class RequestsService {
  constructor(private http: HttpClient) {}
  uri = 'http://localhost:8080'
  public getUser(userID: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.uri}/user/${userID}`)
  }
  public addItem(userID: number, itemText: string): Observable<Item> {
    return this.http.post<Item>(`${this.uri}/user/${userID}/items/add`, itemText);
  }
  public removeItem(userID: number, itemID: number): Observable<null> {
    return this.http.delete<null>(`${this.uri}/user/${userID}/items/remove/${itemID}`);
  }
  public editItem(userID: number, itemID: number, itemText: string): Observable<Item> {
    return this.http.put<Item>(`${this.uri}/user/${userID}/items/update/${itemID}`, itemText);
  }
  public addUser(username: string, items: Item[]): Observable<User> {
    console.log("REQUEST HERE", `${this.uri}/user/add/${username}`, items)
    return this.http.post<IUser>(`${this.uri}/user/add/${username}`, items)
  }
  // transformToUser(user: IUser): User {
  //   return new User(user.userID, user.username, new Map<number, Item>(Object.entries(user.items).map(([key, value]) => [Number(key), value])));
  // }
}
