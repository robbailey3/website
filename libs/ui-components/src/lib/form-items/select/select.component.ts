import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SelectOption {
  key: string;
  value: string;
}

@Component({
  selector: 'rob-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() id: string;

  @Input() name: string;

  @Input() helperText: string;

  @Input() required: boolean;

  @Input() options: SelectOption[];

  @Input() multiple = false;

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
