import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUserLogged: boolean = false;

  form = new FormGroup({
    username: new FormControl('', [Validators.required]), 
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    
  }

  login(data) {
   
    

    //from here
    this.authService.login(data).subscribe(ret => {
      if (!ret) {
        console.log("user is not registered");
        this.isUserLogged = false;
      }
      else {
        this.isUserLogged = true;
        this.router.navigate(["/learning"]);
        localStorage.setItem("username", ret.username);
      }

    });
  }

  isUsedLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  logoutUser() {
    this.authService.logout();
  }

}
