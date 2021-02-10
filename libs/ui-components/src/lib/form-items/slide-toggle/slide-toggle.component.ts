import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'rob-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true
    }
  ]
})
export class SlideToggleComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() id: string;

  @Input() name: string;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() helperText: string;

  public value: boolean;

  public onChange: (newValue: boolean) => any;

  public onTouched: () => any;

  public handleChange($event) {
    const target = $event.target as HTMLInputElement;
    this.onChange(target.checked);
  }

  public writeValue(value: boolean) {
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
}
