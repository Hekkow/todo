import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ItemComponent} from './item/item.component';
import {KeyValue, KeyValuePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {TextInputComponent} from './text-input/text-input.component';
import {HeaderComponent} from './headers/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemComponent, NgForOf, NgIf, NgClass, KeyValuePipe, TextInputComponent, RouterLink, RouterLinkActive, HeaderComponent],
  template: `<router-outlet/>`,
  styles: ``
})
export class AppComponent {}
