import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';

@Directive({
  selector: '[robIntersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit {
  @Output() public isInViewport: EventEmitter<boolean> = new EventEmitter();

  @Input('robIntersectionObserver') public threshold = 0;

  constructor(private el: ElementRef, @Inject(WINDOW) public window: Window) {}

  public ngOnInit() {
    this.setUpObserver();
  }

  private setUpObserver() {
    if ('IntersectionObserver' in this.window) {
      const observer = new (this.window as any).IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isInViewport.emit(true);
            }
          });
        },
        { threshold: this.threshold }
      );
      observer.observe(this.el.nativeElement);
    } else {
      // If the browser doesn't support IntersectionObserver, we'll just assume that the element is in the viewport
      this.isInViewport.emit(true);
    }
  }
}
