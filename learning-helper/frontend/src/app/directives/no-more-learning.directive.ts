import { Router } from '@angular/router';
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[learnNoMoreLearning]'
})
export class NoMoreLearningDirective {

  @Input() currentSubject;

  constructor(private el: ElementRef, private router: Router) { }

  ngOnInit() {
    if (this.currentSubject.quantityOfMaterial === this.currentSubject.progress) {
      this.el.nativeElement.hidden = true;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/learning']);
      });
    }
    
  }

}
