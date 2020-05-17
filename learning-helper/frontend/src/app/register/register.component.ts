import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SamePasswordsDirective } from './../directives/same-passwords.directive';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniqueUsernameDirective } from '../directives/unique-username.directive';

@Component({
  selector: 'learn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatedPassword: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
  }

  register(data) {
    this.authService.register(data).subscribe(v => {
      
    });
    this.router.navigate(["/"]);
  }

  isDataInFormValid() {
    return this.registerForm.valid &&
      SamePasswordsDirective.arePasswordsSame &&
      UniqueUsernameDirective.isUnique;
  }

 

}
