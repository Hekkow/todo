import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-login-header',
  standalone: true,
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  template: '<button><a routerLink="/home" routerLinkActive="active">USE WITHOUT LOGIN</a></button>',
  styles: ''
})
export class LoginHeaderComponent {
}
