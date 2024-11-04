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
  template: '<button class="btn btn-outline-light shadow" routerLink="/home" routerLinkActive="active">USE WITHOUT LOGIN</button>',
  styles: ''
})
export class LoginHeaderComponent {
}
