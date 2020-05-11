import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'learn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  

  constructor(private authService : AuthenticationService) {
    
  }

  isUserLoggedIn() {
    
    return LoginComponent.isUsedLoggedIn();
  }

  ngOnInit(): void {
  }

  loginHeader(data) {
    console.log(data);
  }

  

}
