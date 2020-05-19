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
      let id = Number(data[i]);
      let found = this.subjectsForToday.find(s => s.id === this.planForTodayAllSubjects[i].id);
      if (found !== undefined) {
        this.planForToday.push({
          id: id,
          subjectName: found.subjectName,
          materialForToday: this.planForTodayAllSubjects[i].quantity,
          materialType: found.materialType,
          typeOfExam: found.typeOfExam
        });
      }
    }

  }

  backToOrganization() {
    this.isSelected = false;
    localStorage.removeItem('enteredPlan');
    localStorage.setItem('enteredPlan', 'false');
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

  subjectDone(id, quantity) {
    
    //TODO: row from the table must dissapear

    this.organizerService.updateSubject(localStorage.getItem('username'), Number(id), Number(quantity))
          .subscribe(ret => {
      
    });

  }

  ngOnDestroy() {
    this.subSubjects.unsubscribe();
  }

}
