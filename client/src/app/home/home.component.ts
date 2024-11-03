import {Component, DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TextInputComponent} from "../text-input/text-input.component";
import {RequestsService} from '../requests.service';
import {Item} from '../classes/item';
import {IUser, User} from '../classes/user';
import {HeaderComponent} from '../headers/header.component';
import {HomeHeaderComponent} from '../headers/home-header.component';
import {EventsService} from '../events.service';

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
  latestLocalID = 0;
  constructor(private requestsService: RequestsService, private eventsService: EventsService, private router: Router) {}
  ngOnInit() {
    this.user = this.getLocalUser()
    this.latestLocalID = this.user.latestItemID();
    if (this.user.userID === -1) return;
    this.requestsService.getUser(Number(this.user.userID)).subscribe({
      next: (user) => {
        this.user = new User().fromObject(user);
        this.latestLocalID = this.user.latestItemID();
      },
      error: (e) => console.log(e),
    })
    this.eventsService.logoutButtonEventListener().subscribe(_ => {
      console.log("WHAAAT?")
      localStorage.clear();
      this.user = new User();
      this.router.navigate(['/home']);
    })
  }
  onItemRemoved(itemID: number): void {
    if (this.user.userID !== -1) {
      this.requestsService.removeItem(this.user.userID, itemID).subscribe({
        next: (_) => {
          this.user.removeItem(itemID);
          this.updateLocalUser();
        },
        error: (e) => console.log(e),
      });
    }
    else {
      this.user.removeItem(itemID);
      this.updateLocalUser();
    }
  }

  onItemAdded(itemText: string): void {
    let item = new Item(this.latestLocalID, itemText);
    this.user.addItem(item);
    // this.user.items.set(item.itemID, item);
    this.latestLocalID += 1
    this.updateLocalUser();
    if (this.user.userID !== -1) this.requestsService.addItem(this.user.userID, itemText).subscribe({
      next: (newItem) => {
        this.user.updateItemID(item.itemID, newItem.itemID)
        this.latestLocalID = newItem.itemID + 1
      },
      error: (e) => console.log(e),
    });
  }
  onItemEdited(editedItem: Item) {
    // this.user.items.set(editedItem.itemID, editedItem)
    // this.updateLocalUser()
    // if (this.user.userID !== -1) {
    //   this.requestsService.editItem(this.user.userID, editedItem.itemID, editedItem.itemText).subscribe({
    //     next: (newItem) => {},
    //     error: (e) => console.log(e),
    //   })
    // }
  }
  updateLocalUser(): void {
    console.log("CHANGING");
    localStorage.setItem("user", this.user.toJSON())
  }
  getLocalUser(): User {
    let userString = localStorage.getItem('user');
    console.log("HERE")
    if (!userString) return new User()
    console.log(new User().fromJSON(userString))
    return new User().fromJSON(userString)
  }

  protected readonly Array = Array;
}
