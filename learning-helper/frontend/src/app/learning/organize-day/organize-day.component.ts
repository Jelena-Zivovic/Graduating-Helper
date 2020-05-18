import { Subject } from './../../services/organizer.service';
import { Subscription } from 'rxjs';
import { OrganizerService } from 'src/app/services/organizer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn-organize-day',
  templateUrl: './organize-day.component.html',
  styleUrls: ['./organize-day.component.css']
})
export class OrganizeDayComponent implements OnInit {

  subjectsForToday =  [];
  isSelected = localStorage.getItem('enteredPlan')  === 'true' ? true : false;
  planForTodayAllSubjects = [];
  planForToday = [];
  

  private subSubjects: Subscription;

  constructor(private organizerService: OrganizerService) { }

  ngOnInit(): void {
    this.subSubjects = this.organizerService.getUserSubjects(localStorage.getItem('username'))
        .subscribe(ret => {
        this.subjectsForToday = (ret as []);

        for (let i = 0; i < this.subjectsForToday.length; i++) {
          this.planForTodayAllSubjects.push(this.organizerService.organizeSubjectForToday(this.subjectsForToday[i]));
        }
        console.log(this.planForToday);
    });
  }

  getMaterialForToday(id) {
    for (let i = 0; i < this.planForTodayAllSubjects.length; i++) {
      if (id === this.planForTodayAllSubjects[i].id) {
        return this.planForTodayAllSubjects[i].quantity;
      }
    }
  }

  submit(data) {
    localStorage.setItem('enteredPlan', 'true');
    this.isSelected = true;
    
    for (let i = 0; i < data.length; i++) {
      this.organizerService.getSubject(data[i]).subscribe(ret =>{
        if (ret !== null) {
          this.planForToday.push({
            subjectName: (ret as Subject).subjectName,
            materialType: (ret as Subject).materialType,
            typeOfExam: (ret as Subject).typeOfExam,
            materialForToday: this.getMaterialForToday((ret as Subject).id)

          });
        }
      });
    }

  }

  backToOrganization() {
    this.isSelected = false;
  }

  getQuantityForTodayMessage(id) {
    

    for (let i = 0; i < this.planForTodayAllSubjects.length; i++) {
      if (id === this.planForTodayAllSubjects[i].id) {
        
        let material = "";
        if (this.planForTodayAllSubjects[i].materialType === 'book') {
          material = this.planForTodayAllSubjects[i].quantity.toString() + " pages"
        }
        else if (this.planForTodayAllSubjects[i].materialType === 'videoLessons') {
          material = this.planForTodayAllSubjects[i].quantity.toString() + 
            (this.planForTodayAllSubjects[i].quantity === 1 ? " video lesson" : " video lessons");
        }
        else if (this.planForTodayAllSubjects[i].materialType === 'presentations') {
          material = this.planForTodayAllSubjects[i].quantity.toString() + 
            (this.planForTodayAllSubjects[i].quantity === 1 ? " presentation" : " presentations");
        }
        else {
          material = this.planForTodayAllSubjects[i].quantity.toString() + 
            (this.planForTodayAllSubjects[i].quantity === 1 ? " lecture" : " lectures");
        }

        let daysRepeat = this.planForTodayAllSubjects[i].daysForRepeating.toString() + 
            " days for repeating"

        let message = material + ", " + daysRepeat;
        return message;

      }
    }
  }

  ngOnDestroy() {
    this.subSubjects.unsubscribe();
  }

}
