import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SamePasswordsDirective } from './../directives/same-passwords.directive';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
  }

  register(data) {
    this.authService.register(data);
    this.router.navigate(["/"]);
  }

 

}
