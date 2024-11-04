import {Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TextInputComponent} from "../text-input/text-input.component";
import {RequestsService} from '../services/requests.service';
import {Item} from '../classes/item';
import {IUser, User} from '../classes/user';
import {HeaderComponent} from '../headers/header.component';
import {HomeHeaderComponent} from '../headers/home-header.component';
import {EventsService} from '../services/events.service';
import {QueuedRequest} from '../classes/queuedRequest';
import {RequestQueueService} from '../services/request-queue.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    TextInputComponent,
    HeaderComponent,
    HomeHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  user: IUser = new User();
  latestLocalID = 1;


  constructor(private requestsService: RequestsService, private eventsService: EventsService, private router: Router, private requestQueue: RequestQueueService) {}
  ngOnInit() { // send all local things
    this.requestQueue.resetQueue();
    this.user = this.getLocalUser()
    this.latestLocalID = this.user.latestItemID();
    if (this.user.userID === -1) return;
    let requestID = this.requestQueue.getLatestRequestID()
    this.requestQueue.addRequest(requestID, 100, () => {
      this.requestsService.getUser(Number(this.user.userID)).subscribe({
        next: (user) => {
          if (!user) return
          if (user && user.modified > this.user.modified) this.user = new User().fromObject(user);
          this.latestLocalID = this.user.latestItemID();
          this.requestQueue.requestSuccessful(requestID);
          for (let item of this.user.items) {
            if (item.local) {
              this.sendEditItem(item);
            }
            else if (item.itemID < 0 ) {
              this.sendItemRemoved(item.itemID * -1);
            }
          }
        },
        error: (e) => this.requestQueue.requestFailed(requestID, e),
      })
    }, "logging in")
    this.eventsService.logoutButtonEventListener().subscribe(_ => {
      localStorage.clear();
      this.user = new User();
      this.router.navigate(['/login']);
      this.requestQueue.resetQueue();
    })
  }
  onItemRemoved(itemID: number): void {
    if (this.user.userID === -1) {
      this.user.removeItem(itemID);
      this.updateLocalUser();
      return
    }
    this.user.removeItemLocal(itemID); // deletes locally temporarily by setting id to negative
    this.updateLocalUser();
    this.sendItemRemoved(itemID);
  }
  sendItemRemoved(itemID: number): void {
    let requestID = this.requestQueue.getLatestRequestID();
    this.requestQueue.addRequest(requestID, 10, () => {
      this.requestsService.removeItem(this.user.userID, itemID).subscribe({
        next: (_) => {
          this.user.removeItem(itemID * -1);
          this.requestQueue.requestSuccessful(requestID);
          this.updateLocalUser()
        },
        error: (e) => this.requestQueue.requestFailed(requestID, e),
      });
    }, "removing " + itemID);
  }

  onItemAdded(itemText: string): void {
    let item = new Item(this.latestLocalID, itemText, true);
    this.user.addItem(item);
    this.latestLocalID += 1
    this.updateLocalUser();
    if (this.user.userID === -1) return;
    this.sendNewItem(item);
  }
  sendNewItem(item: Item): void {
    let requestID = this.requestQueue.getLatestRequestID();
    this.requestQueue.addRequest(requestID, 5, () => {
      this.requestsService.addItem(this.user.userID, item.itemText).subscribe({
        next: (newItem) => {
          this.user.updateItemID(item.itemID, newItem.itemID)
          this.latestLocalID = newItem.itemID + 1
          this.requestQueue.requestSuccessful(requestID);
          this.updateLocalUser();
        },
        error: (e) => this.requestQueue.requestFailed(requestID, e),
      });
    }, "adding " + item.itemText);
  }
  onItemEdited(editedItem: Item) { // set local to true again here
    this.user.editItem(editedItem.itemID, editedItem.itemText)
    this.updateLocalUser()
    if (this.user.userID !== -1) {
      this.sendEditItem(editedItem)
    }
  }
  sendEditItem(editedItem: Item) {
    let requestID = this.requestQueue.getLatestRequestID();
    this.requestQueue.addRequest(requestID, 5, () => {
      this.requestsService.editItem(this.user.userID, editedItem.itemID, editedItem.itemText).subscribe({
        next: (newItem) => {
          this.user.setLocal(editedItem.itemID, false);
          this.requestQueue.requestSuccessful(requestID);
          this.updateLocalUser();
        },
        error: (e) => this.requestQueue.requestFailed(requestID, e),
      })
    }, "editing " + editedItem);
  }
  updateLocalUser(): void {
    localStorage.setItem("user", this.user.toJSON())
  }
  getLocalUser(): User {
    let userString = localStorage.getItem('user');
    if (!userString) return new User()
    return new User().fromJSON(userString)
  }
  filteredItems(): Item[] {
    return this.user.items.filter(item => item.itemID >= 0);
  }
  protected readonly Array = Array;
}
