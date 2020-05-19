import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../services/organizer.service';
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

  userSubjects = [];

  private subUserInfo: Subscription;
  private subSubjects: Subscription;

  constructor(private authService: AuthenticationService,
              private organizerService: OrganizerService) { }

  ngOnInit(): void {
   this.subUserInfo = this.authService.getUserInfo(localStorage.getItem('username')).subscribe(ret => {
      this.userInfo = {
        firstName: ret.firstName,
        lastName: ret.lastName,
        username: ret.username,
        email: ret.email
      }
    });

    this.subSubjects = this.organizerService.getUserSubjects(localStorage.getItem('username')).subscribe(ret => {
      if (ret !== null) {
        let len = (ret as []).length;
        
        for (let i = 0; i < len; i++) {
          let date = new Date(ret[i].examDate);
          let dateStr = date.getDate().toString() + '.' 
                      + (date.getMonth() + 1).toString() + '.' 
                      + date.getFullYear() + '.';
          this.userSubjects.push({
            id: ret[i].id,
            subjectName: ret[i].subjectName,
            examDate: dateStr,
            typeOfExam: ret[i].typeOfExam,
            materialType: ret[i].materialType,
            quantityOfMaterial: ret[i].quantityOfMaterial,
            daysUntilExam: this.organizerService.calculateDaysUntilExam(ret[i].examDate),
            progress: ret[i].progress

          });
        }
      }
      else {
        console.log('something went wrong');
      }
    });
  }

  changeData() {

  }

  deleteAccount() {
    if (confirm('Are you sure?')) {
      this.authService.deleteUser(localStorage.getItem('username')).subscribe(() => {
        console.log('User is deleted'); 
      });
    }
  }

  calculateValue(id) {
    for (let i = 0; i < this.userSubjects.length; i++) {
      if (id === this.userSubjects[i].id) {
        let value = (100*this.userSubjects[i].progress) / this.userSubjects[i].quantityOfMaterial;
        return value;
      }
    }
  }

  ngOnDestroy() {
    this.subUserInfo.unsubscribe();
    this.subSubjects.unsubscribe();
  }

}
