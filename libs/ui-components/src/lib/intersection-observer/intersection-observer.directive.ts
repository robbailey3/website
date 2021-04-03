import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Output
} from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Directive({
  selector: '[robIntersectionObserver]'
})
export class IntersectionObserverDirective {
  @Output() public isInViewport: EventEmitter<boolean> = new EventEmitter();

  constructor(private el: ElementRef, @Inject(WINDOW) public window: Window) {
    this.setUpObserver();
  }

  private setUpObserver() {
    if ('IntersectionObserver' in this.window) {
      const observer = new (this.window as any).IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isInViewport.emit(true);
              console.log(this.isInViewport);
            }
          });
        }
      );
      observer.observe(this.el.nativeElement);
    }
  }
}
