import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  template: `
  <header>
    <div>TODO</div>
    <ng-content/>
  </header>`,
  styles: `
    header {
      position: absolute;
      width: 100%;
      height: 60px;
      top: 0;
      background-color: #0f0;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px 0 20px;
      box-sizing: border-box;
    }
  `
})
export class HeaderComponent {

}
