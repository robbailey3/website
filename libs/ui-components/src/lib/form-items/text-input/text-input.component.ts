import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rob-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() id: string;

  @Input() name: string;

  @Input() placeholder: string;

  @Input() helperText: string;

  @Input() minLength: number;

  @Input() maxLength: number;

  @Input() pattern: RegExp | string;

  @Input() type: 'text' | 'email' | 'password' | 'search';

  @Input() required: boolean;

  public disabled = false;

  public value: string;

  public onChange: (value: string) => any;

  public onTouched: () => any;

  public writeValue(value: string) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public change() {
    this.onChange(this.value);
  }
}
