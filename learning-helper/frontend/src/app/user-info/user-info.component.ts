import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'learn-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo = {
    firstName: "",
    lastName: "",
    username: "",
    email: ""
  };

  private subUserInfo: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.subUserInfo = this.authService.getUserInfo(localStorage.getItem('username')).subscribe(ret => {
      this.userInfo = {
        firstName: ret.firstName,
        lastName: ret.lastName,
        username: ret.username,
        email: ret.email
      }
    });
  }

  changeData() {

  }

  deleteAccount() {
    if (confirm('Are you sure?')) {
      this.authService.deleteUser(localStorage.getItem('username')).subscribe(ret => {
        console.log('User is deleted');
        
        
      });
    }
    
  }

  ngOnDestroy() {
    this.subUserInfo.unsubscribe();
  }

}
