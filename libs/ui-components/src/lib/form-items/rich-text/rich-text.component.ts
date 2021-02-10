import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const tinymce: any;

@Component({
  selector: 'rob-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => RichTextComponent),
      multi: true
    }
  ]
})
export class RichTextComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() id: string;

  @Input() name: string;

  @Input() helperText: string;

  @Input() config: any;

  @Input() minLength: number;

  @Input() maxLength: number;

  @Input() disabled: boolean;

  @Input() inline = false;

  @Input() value: string;

  @Input() required: boolean;

  public onChange;

  public onTouched;

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public change() {
    this.onChange(this.value);
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
