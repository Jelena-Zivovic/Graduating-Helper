import { LearningComponent } from './../../learning/learning.component';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'learn-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css']
})
export class ChangeUserInfoComponent implements OnInit {


  changeDataForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    repeatedPassword: new FormControl()
  });

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

   change(data) {

    console.log(data);

    let promise = this.authService.getUserInfo(localStorage.getItem('username')).toPromise();

    promise.then(currentUserInfo => {
      let newUserInfo = {
        firstName: (data.firstName === null || data.firstName === "") ? currentUserInfo.firstName : data.firstName,
        lastName: (data.lastName === null || data.lastName === "") ? currentUserInfo.lastName : data.lastName,
        email: (data.email === null || data.email === "") ? currentUserInfo.email : data.email,
        username: currentUserInfo.username,
        password: (data.password === null || data.password === "") ? currentUserInfo.password : data.password,
        repeatedPassword: (data.repeatedPassword === null || data.repeatedPassword === "") ? currentUserInfo.password : data.repeatedPassword

      };

      

      this.authService.updateUserInfo(newUserInfo.username, newUserInfo).subscribe((ret) => {
        if (ret) {
          console.log("user info updated");
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/learning']);
            LearningComponent.activeTab = 3;
          });
        }
        else {
          console.log("something went wrong");
        }
      });

    },
    error => {
      console.log(error);
    });
    
  }

 
 

}
