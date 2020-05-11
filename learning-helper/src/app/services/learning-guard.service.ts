import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './../header/login/login.component';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LearningGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }


  canActivate() {
    if (LoginComponent.isUsedLoggedIn()) {
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }
}
