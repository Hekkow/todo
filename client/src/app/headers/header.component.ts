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
  <nav class="navbar navbar-dark bg-primary shadow p-3">
    <span class="navbar-brand mb-0 h1">TODO</span>
    <ng-content/>
  </nav>`,
  styles: `
    /*nav {*/
    /*  padding-left: 20px;*/
    /*  padding-right: 20px;*/
    /*}*/
    /*header {*/
    /*  position: absolute;*/
    /*  width: 100%;*/
    /*  height: 60px;*/
    /*  top: 0;*/
    /*  z-index: 1;*/
    /*  display: flex;*/
    /*  justify-content: space-between;*/
    /*  align-items: center;*/
    /*  padding: 0 20px 0 20px;*/
    /*  box-sizing: border-box;*/
    /*}*/
  `
})
export class HeaderComponent {

}
