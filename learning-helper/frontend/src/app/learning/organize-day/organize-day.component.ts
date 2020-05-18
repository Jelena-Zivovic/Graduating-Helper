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
  isSelected = false;

  private subSubjects: Subscription;

  constructor(private organizerService: OrganizerService) { }

  ngOnInit(): void {
    this.subSubjects = this.organizerService.getUserSubjects(localStorage.getItem('username'))
        .subscribe(ret => {
        this.subjectsForToday = (ret as []);
        console.log(this.subjectsForToday);
    });
  }

  today() {
    let now = new Date();
    return now.getDate().toString() + '.' + 
           (now.getMonth() + 1).toString() + '.' + 
           now.getFullYear().toString() + '.';
  }

  submit(data) {
    console.log(data);
    this.isSelected = true;
  }

  backToOrganization() {
    this.isSelected = false;
  }

  ngOnDestroy() {
    this.subSubjects.unsubscribe();
  }

}
