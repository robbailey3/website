import { Directive, ElementRef, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[robWordCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: WordCountDirective,
      multi: true
    }
  ]
})
export class WordCountDirective implements Validator {
  @Input('robWordCount') wordCountLimit: number;

  constructor(private readonly el: ElementRef) {}

  public validate(control: FormControl) {
    if (this.wordCountLimit === undefined) {
      throw Error('wordCountLimit has not been provided to WordCountDirective');
    }
    if (control.value && typeof control.value === 'string') {
      if (control.value.split(/\s/gm).length > this.wordCountLimit) {
        return { maxWordCount: true };
      }
    }
    return null;
  }
}
