import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'rob-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor {
  @Input() label: string;

  @Input() id: string;

  @Input() name: string;

  @Input() min = 0;

  @Input() max = 100;

  @Input() step = 1;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() helperText: string;

  public value: number;

  public onChange: (newValue: number) => any;

  public onTouched: () => any;

  public handleChange($event: MouseEvent) {
    const target = $event.target as HTMLInputElement;
    this.onChange(parseInt(target.value, 10));
  }

  public writeValue(value: number) {
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
