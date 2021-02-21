import { ElementRef } from '@angular/core';
import { IntersectionObserverDirective } from './intersection-observer.directive';

describe('IntersectionObserverDirective', () => {
  it('should create an instance', () => {
    const directive = new IntersectionObserverDirective(
      new ElementRef(document.createElement('div')),
      window
    );
    expect(directive).toBeTruthy();
  });
});
