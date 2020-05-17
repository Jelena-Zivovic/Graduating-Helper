import { AuthenticationService } from './../services/authentication.service';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[learnUniqueUsername]'
})
export class UniqueUsernameDirective {

  public static isUnique;

  @HostListener('keyup') onKeyup() {
    let value = this.el.nativeElement.value;

    this.authService.getUserInfo(value).subscribe(ret => {
      if (ret !== null) {
        document.getElementById('errorUsername').style.color = 'red';
        document.getElementById('errorUsername').textContent = 'Username is not unique';
        UniqueUsernameDirective.isUnique = false;
      }
      else{ 
        document.getElementById('errorUsername').style.color = 'green';
        document.getElementById('errorUsername').textContent = 'Username is unique';
        UniqueUsernameDirective.isUnique = true;
          
      }
    });    
  }

  constructor(private el: ElementRef, private authService: AuthenticationService) {

}

}
