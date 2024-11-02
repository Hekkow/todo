import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from './item/item';
import {User} from './user/user';
import {map, Observable} from 'rxjs';
@Injectable({providedIn: 'root'})
export class RequestsService {
  constructor(private http: HttpClient) {}
  uri = 'http://localhost:8080'
  public randomItem(): Observable<Item> {
    return this.http.get<Item>(`${this.uri}/randomItem`)
  }
  public getUser(userID: number): Observable<User> {
    return this.http.get<User>(`${this.uri}/user/${userID}`).pipe(
      map((user: User) => {
        return {...user, items: new Map<number, Item>(Object.entries(user.items).map(([key, value]) => [Number(key), value]))};
      })
    )
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
  public getLatestID(): Observable<number> {
    return this.http.get<number>(`${this.uri}/latestItemID`);
  }
  public addUser(): void {
    this.http.post<User>(`${this.uri}/user/add/bobathan`, null).subscribe({
      next: (user) => alert(`ID: ${user.userID}, Text: ${user.username}`),
      error: (e) => console.log(e),
    })
  }
}
