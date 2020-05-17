import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[learnSamePasswords]'
})
export class SamePasswordsDirective {

  public static arePasswordsSame;

  @Input() enteredPassword: string;

  @HostListener('keyup') onKeyup() {
    if (this.el.nativeElement.value !== this.enteredPassword) {
      document.getElementById('errorPasswords').style.color = 'red';
      document.getElementById('errorPasswords').textContent = "Passwords are not the same";
      SamePasswordsDirective.arePasswordsSame = false;
    }
    else {
      document.getElementById('errorPasswords').style.color = 'green';
      document.getElementById('errorPasswords').textContent = "Passwords are the same";
      SamePasswordsDirective.arePasswordsSame = true;
    }
    
  }


  constructor(private el: ElementRef) {
    
  }

}
