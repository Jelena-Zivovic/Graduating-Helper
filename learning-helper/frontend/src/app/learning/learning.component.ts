import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'learn-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  

  constructor(private authService: AuthenticationService) { }

  activeTab = 1;

  ngOnInit(): void {
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
    
  }

  

}
