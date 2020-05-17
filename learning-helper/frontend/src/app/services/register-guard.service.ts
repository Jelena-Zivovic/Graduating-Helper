import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuardService implements CanActivate {

  canActivate() {
    if (!this.authService.isUserLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }

  }

  constructor(private authService: AuthenticationService,
              private router: Router) { }
}
