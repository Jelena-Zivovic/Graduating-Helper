import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrganizerService } from '../services/organizer.service';

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
  private subUserSubjects: Subscription;

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

    this.subUserSubjects = this.organizerService.getUserSubjects(localStorage.getItem('username')).subscribe(ret => {
      if (ret !== null) {
        let len = (ret as Object[]).length;
        for (let i = 1; i < len; i++) {
          this.userSubjects.push({
            subjectName: ret[i].subjectName,
            examdate: ret[i].examDate,
            typeOfExam: ret[i].typeOfExam,
            materialType: ret[i].materialType,
            quantityOfMaterial: ret[i].quantityOfMaterial,
            daysUntilExam: this.organizerService.calculateDaysUntilExam(ret[i].examDate)
          });
        }
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
    this.subUserSubjects.unsubscribe();
  }

}
