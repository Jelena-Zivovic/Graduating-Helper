import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'learn-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  
  static activeTab: number;

  ngOnInit(): void {
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
    
  }

  whichActiveTab() {
    return LearningComponent.activeTab;
  }

}
