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

  form = new FormGroup({
    username: new FormControl('', [Validators.required]), 
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    
  }

  login(data) {
    this.authService.login(data).subscribe(ret => {
      if (!ret) {
        alert("user is not registered");
      }
      else {
        if (ret.password === this.form.get('password').value) {
          this.router.navigate(["/learning"]);
          localStorage.setItem("username", ret.username);
        }
        else {
          alert("wrong password");
        }
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
