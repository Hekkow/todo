import {Component, ElementRef, ViewChild} from '@angular/core';
import {HeaderComponent} from "../headers/header.component";
import {HomeHeaderComponent} from "../headers/home-header.component";
import {LoginHeaderComponent} from '../headers/login-header.component';
import {RequestsService} from '../requests.service';
import {User} from '../classes/user';
import {Item} from '../classes/item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeHeaderComponent,
    LoginHeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('usernameInput') usernameInput !: ElementRef;
  constructor(private requestsService: RequestsService, private router: Router) {}
  login() {
    let items: Item[] = [];
    let user = localStorage.getItem('user')
    if (user) {
      items = JSON.parse(user).items
    }
    this.requestsService.addUser(this.usernameInput.nativeElement.value, items).subscribe({
      next: (newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        this.router.navigate(['/home']);
      },
      error: (e) => console.log(e),
    })
  }
}
