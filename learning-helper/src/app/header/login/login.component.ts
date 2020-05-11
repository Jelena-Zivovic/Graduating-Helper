import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private static isUserLogged: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    
  }

  login(data) {
    LoginComponent.isUserLogged = true;
    this.authService.login(data);
    this.router.navigate(["/learning"]);

  }

  static isUsedLoggedIn() {
    return LoginComponent.isUserLogged;
  }

  static logoutUser() {
    LoginComponent.isUserLogged = false;
  }

}
