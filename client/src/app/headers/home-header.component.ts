import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IUser} from '../classes/user';
import {EventsService} from '../services/events.service';

@Component({
  selector: 'app-home-header',
  standalone: true,
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  template: `
    <div class="d-flex flex-row align-items-center">
      <p class="text-light" style="margin: 0; padding-right: 10px">{{user.username}}</p>
      <button type="button" class="btn btn-outline-light shadow" *ngIf="user && user.userID === -1" routerLink="/login" routerLinkActive="active">LOGIN</button>
      <button type="button" class="btn btn-outline-light shadow" *ngIf="user && user.userID !== -1" (click)="eventsService.emitLogoutButtonClicked()">LOGOUT</button>
    </div>
    `,
  styles: ''
})
export class HomeHeaderComponent {
  @Input() user !: IUser;
  constructor(protected eventsService: EventsService) {}
}
