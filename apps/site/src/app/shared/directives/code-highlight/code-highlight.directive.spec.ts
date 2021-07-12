import { ElementRef } from '@angular/core';
import { CodeHighlightDirective } from './code-highlight.directive';

describe('CodeHighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new CodeHighlightDirective(
      new ElementRef(document.createElement('div'))
    );
    expect(directive).toBeTruthy();
  });
});
