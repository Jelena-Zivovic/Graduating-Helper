import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[learnNoMoreLearning]'
})
export class NoMoreLearningDirective {

  @Input() currentSubject;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.currentSubject.quantityOfMaterial === this.currentSubject.progress) {
      this.el.nativeElement.hidden = true;
    }
    
  }

}
