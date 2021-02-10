import { ElementRef } from '@angular/core';
import { FocusTrapDirective } from './focus-trap.directive';

describe('FocusTrapDirective', () => {
  it('should create an instance', () => {
    const directive = new FocusTrapDirective(
      new ElementRef(document.createElement('div'))
    );
    expect(directive).toBeTruthy();
  });

  // TODO: Implement some tests
});
