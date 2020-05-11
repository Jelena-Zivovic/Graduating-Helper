import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[learnSamePasswords]'
})
export class SamePasswordsDirective {

  private enteredPassword: string;

  @HostListener('keyup') onKeyup() {
    console.log(this.el.nativeElement.value);
  }

  constructor(private el: ElementRef) {
    
  }

}
