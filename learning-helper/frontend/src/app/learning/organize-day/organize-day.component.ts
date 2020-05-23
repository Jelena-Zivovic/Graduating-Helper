import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizerService } from 'src/app/services/organizer.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LearningComponent } from '../learning.component';

@Component({
  selector: 'learn-organize-day',
  templateUrl: './organize-day.component.html',
  styleUrls: ['./organize-day.component.css']
})
export class OrganizeDayComponent implements OnInit {

  @Output() whichTabIsActive: EventEmitter<any> = new EventEmitter<any>();

  subjectsForToday =  [];
  isSelected = localStorage.getItem('enteredPlan')  === 'true' ? true : false;
  planForTodayAllSubjects = [];
  planForToday = [];
  

  private subSubjects: Subscription;
  private subPlan: Subscription;

  constructor(private organizerService: OrganizerService,
              private router: Router) {
    
  }


  ngOnInit(): void {
    this.subSubjects = this.organizerService.getUserSubjects(localStorage.getItem('username'))
        .subscribe(ret => {
        this.subjectsForToday = (ret as []);
    });   

    this.subPlan = this.organizerService.getUserPlan(localStorage.getItem('username'))
        .subscribe(ret => {
          if (ret !== null) {
            this.planForToday = ret as [];
          }
        });
  }

  public chooseTab(tabActive: number) {
    this.whichTabIsActive.emit(tabActive);
  }

  getMaterialForToday(id) {
    for (let i = 0; i < this.planForTodayAllSubjects.length; i++) {
      if (id === this.planForTodayAllSubjects[i].id) {
        return this.planForTodayAllSubjects[i].quantity;
      }
    }
  }

  submit(data) {

    this.organizerService.deletePlans(localStorage.getItem('username'))
      .subscribe(ret => {
        
    });


    for (let i = 0; i < data.length; i++) {
      let result = this.subjectsForToday.find(s => {
        return s.id === Number(data[i]);
      });
      if (result !== undefined) {
        let plan = this.organizerService.organizeSubjectForToday(result);
        this.organizerService.addPlan(localStorage.getItem('username'), plan)
          .subscribe(ret => {
          });
        
      }
    }

    localStorage.setItem('enteredPlan', 'true');
    this.isSelected = true;

    

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/learning']);
      LearningComponent.activeTab = 1;
    });

    
    
    
  }


  backToOrganization() {
    this.isSelected = false;
    localStorage.removeItem('enteredPlan');
    localStorage.setItem('enteredPlan', 'false');
  
    

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/learning']);
      LearningComponent.activeTab = 1;
    });

    
  }

  getQuantityForTodayMessage(id) {
    
    let subjectPlan = this.subjectsForToday.find(s => {
      return s.id === id;
    });

    if (subjectPlan === undefined) {
      return;
    }

    let material = "";
    let quantity = this.organizerService.organizeSubjectForToday(subjectPlan).materialForToday;

    if (subjectPlan.materialType === 'book') {
      material = quantity + " pages";
    }
    else if (subjectPlan.materialType === 'videoLessons') {
      material = quantity === 1 ? "1 video lesson" : (quantity + " video lessons");
    }
    else if (subjectPlan.materialType === 'presentations') {
      material = quantity === 1 ? "1 presentation" : (quantity + " presentations");
    }
    else if (subjectPlan.materialType === 'lectures') {
      material = quantity === 1 ? "1 lecture" : (quantity + " lectures");
    }

    let daysRepeat = this.organizerService.organizeSubjectForToday(subjectPlan).daysForRepeating;

    return material + ", " + daysRepeat + " days for repeating";

  }

  subjectDone(subject) {
    
    this.organizerService.updateSubject(localStorage.getItem('username'), Number(subject.id), Number(subject.materialForToday))
          .subscribe(ret => {
      
    });

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/learning']);
      LearningComponent.activeTab = 1;
    });


    document.getElementById(subject.id.toString()).style.display = 'none';    
    this.organizerService.deletePlan(localStorage.getItem('username'), subject.id)
      .subscribe(ret => {
        LearningComponent.activeTab = 1;
      });
    
  }

  ngOnDestroy() {
    this.subSubjects.unsubscribe();
    this.subPlan.unsubscribe();
  }

}
