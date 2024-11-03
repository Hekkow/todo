import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IUser} from '../classes/user';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-home-header',
  standalone: true,
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  template: `{{user.username}}
  <button *ngIf="user.userID === -1"><a routerLink="/login" routerLinkActive="active">LOGIN</a></button>
  <button *ngIf="user.userID !== -1" (click)="eventsService.emitLogoutButtonClicked()"><a routerLink="/login" routerLinkActive="active">LOGOUT</a></button>`,
  styles: ''
})
export class HomeHeaderComponent {
  @Input() user !: IUser;
  constructor(protected eventsService: EventsService) {}
}
