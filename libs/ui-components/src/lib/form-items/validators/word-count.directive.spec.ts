import { FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { WordCountDirective } from './word-count.directive';

describe('WordCountDirective', () => {
  let el;
  let directive: WordCountDirective;
  let formControl: FormControl;
  beforeEach(() => {
    el = document.createElement('textarea');
    formControl = new FormControl();
    directive = new WordCountDirective(new ElementRef(el));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have a validate method', () => {
    expect(directive.validate).toBeTruthy();
  });

  it('should return {maxWordCount: true} if the formControl has too many words', () => {
    directive.wordCountLimit = 10;
    formControl.patchValue('1 2 3 4 5 6 7 8 9 10 11 12');
    expect(directive.validate(formControl)).toEqual({ maxWordCount: true });
  });

  it(`should return "null" if the formControl doesn't have too many words`, () => {
    directive.wordCountLimit = 100;
    formControl.patchValue('1 2 3 4 5 6 7 8 9 10 11 12');
    expect(directive.validate(formControl)).toEqual(null);
  });

  it('should throw an error if the wordCountLimit is not explicitly set', () => {
    expect(() => directive.validate(formControl)).toThrow();
  });
});
