import { LoginComponent } from './../login/login.component';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'learn-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getLoggedUserUsername() {
    return this.authService.getCurrentUserUsername();
  }

  logout() {
    this.authService.logout();
    LoginComponent.logoutUser();
  }

}
