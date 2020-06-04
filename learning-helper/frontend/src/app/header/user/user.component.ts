import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'learn-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  getLoggedUserUsername() {
    return this.authService.getCurrentUserUsername();
  }

  logout() {
    
    this.authService.logout();
    
    this.router.navigate(["/"]);
    this.onLogin.emit(false);
  }

}
