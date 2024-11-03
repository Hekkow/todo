import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
  private logoutButtonClicked = new Subject<boolean>();
  emitLogoutButtonClicked() {
    this.logoutButtonClicked.next(true);
  }
  logoutButtonEventListener() {
    return this.logoutButtonClicked.asObservable();
  }
}
