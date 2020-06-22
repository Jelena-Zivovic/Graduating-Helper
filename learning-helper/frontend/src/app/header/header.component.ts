import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'learn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  userLogged: boolean;

  constructor(private authService : AuthenticationService) { }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  displayUsername(userLogged: boolean) {
    this.userLogged = userLogged;
  }

  userLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  ngOnInit(): void {
    this.userLogged = localStorage.length > 0;
  }

}
