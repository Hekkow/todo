import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ItemComponent} from './item/item.component';
import {KeyValue, KeyValuePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {TextInputComponent} from './text-input/text-input.component';
import {User} from './user/user';
import {HttpClient} from '@angular/common/http';
import {Item} from './item/item';
import {RequestsService} from './requests.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemComponent, NgForOf, NgIf, NgClass, KeyValuePipe, TextInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user = new User()
  latestLocalID = 0;
  constructor(private requestsService: RequestsService) {}
  ngOnInit() {
    this.requestsService.getUser(0).subscribe({
      next: (user) => {
        this.user = user;
        let items = Array.from(this.user.items.values());
        if (items.length > 0) this.latestLocalID = items[items.length - 1].itemID + 1;
        this.requestsService.getLatestID().subscribe({
          next: (latestID) => {
            this.latestLocalID = latestID + 1;

          },
          error: (e) => console.log(e)
        })
      },
      error: (e) => console.log(e),
    })
  }
  onItemRemoved(itemID: number): void {

    if (this.user.userID !== -1) {
      this.requestsService.removeItem(this.user.userID, itemID).subscribe({
        next: (_) => {
          this.user.items.delete(itemID);
        },
        error: (e) => console.log(e),
      });
    }
    else {
      this.user.items.delete(itemID);
    }
  }

  onItemAdded(itemText: string): void {
    let item = new Item(this.latestLocalID, itemText);
    this.user.items.set(item.itemID, item);
    this.latestLocalID += 1
    if (this.user.userID !== -1) this.requestsService.addItem(this.user.userID, itemText).subscribe({
      next: (newItem) => {
        this.user.items.delete(item.itemID);
        this.user.items.set(newItem.itemID, newItem);
        this.latestLocalID = newItem.itemID + 1
      },
      error: (e) => console.log(e),
    });
  }
  onItemEdited(editedItem: Item) {
    this.user.items.set(editedItem.itemID, editedItem)
    if (this.user.userID !== -1) {
      this.requestsService.editItem(this.user.userID, editedItem.itemID, editedItem.itemText).subscribe({
        next: (newItem) => {},
        error: (e) => console.log(e),
      })
    }
  }

  protected readonly Array = Array;
}
