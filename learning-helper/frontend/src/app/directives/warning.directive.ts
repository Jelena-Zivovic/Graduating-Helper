import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[learnWarning]'
})
export class WarningDirective {

  @Input() currentSubject;

  constructor(private el: ElementRef) {
    
    
  }

  ngOnInit() {

    let percentage = Math.ceil((this.currentSubject.progress * 100) / this.currentSubject.quantityOfMaterial);


    if (this.currentSubject.daysUntilExam < 2 && percentage <= 50) {
      this.el.nativeElement.bgColor = '#ff2a2e';
      
    }

    if (percentage === 100) {
      this.el.nativeElement.bgColor = "#00ff58";
    }
  }


}
