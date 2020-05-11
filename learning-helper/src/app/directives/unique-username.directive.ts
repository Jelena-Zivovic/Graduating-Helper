import { AuthenticationService } from './../services/authentication.service';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[learnUniqueUsername]'
})
export class UniqueUsernameDirective {

  @HostListener('keyup') onKeyup() {
    let allUsers = this.authService.getAllRegisteredUsers();
    let value = this.el.nativeElement.value;
    
  }

  constructor(private el: ElementRef, private authService: AuthenticationService) { }

}
