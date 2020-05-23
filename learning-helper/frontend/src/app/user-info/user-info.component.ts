import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../services/organizer.service';
import { Subscription } from 'rxjs';
import { LearningComponent } from '../learning/learning.component';

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
              private organizerService: OrganizerService,
              private router: Router) { }

  ngOnInit(): void {
   this.subUserInfo = this.authService.getUserInfo(localStorage.getItem('username')).subscribe(ret => {
     if (ret !== null) {
      this.userInfo = {
        firstName: ret.firstName,
        lastName: ret.lastName,
        username: ret.username,
        email: ret.email
      }
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
            examDate: date,
            typeOfExam: ret[i].typeOfExam,
            materialType: ret[i].materialType,
            quantityOfMaterial: ret[i].quantityOfMaterial,
            daysUntilExam: this.organizerService.calculateDaysUntilExam(ret[i].examDate),
            progress: ret[i].progress

          });
        }
      }
    });
  }
  
  deleteAccount() {
    if (confirm('Are you sure?')) {
      this.authService.deleteUser(localStorage.getItem('username')).subscribe(() => {
        this.router.navigate(['/']);
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

  deleteSubject(subject) {
    document.getElementById('row' + subject.id).style.display = 'none';
    this.organizerService.deleteSubject(localStorage.getItem('username'), subject.id)
      .subscribe(ret => {
      });

    this.organizerService.deletePlan(localStorage.getItem('username'), subject.id)
      .subscribe(ret => {
      })
    
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/learning']);
        LearningComponent.activeTab = 2;
      });
  }

  ngOnDestroy() {
    this.subUserInfo.unsubscribe();
    this.subSubjects.unsubscribe();
  }

}
