import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 *
 * A reusable simple Button component
 * @export
 * @class ButtonComponent
 */
@Component({
  selector: 'rob-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';

  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'md';

  @Input() href?: string;

  @Input() disabled: boolean;

  @Input() label = '';

  @Input() icon: IconProp | IconDefinition;

  @Input() routerLink: string | any[];

  @Output() public buttonClick: EventEmitter<MouseEvent> = new EventEmitter();

  public handleButtonClick($event: MouseEvent) {
    this.buttonClick.emit($event);
  }

  public generateButtonClass() {
    return {
      'btn-primary': this.variant === 'primary',
      'btn-secondary': this.variant === 'secondary',
      'btn-tertiary': this.variant === 'tertiary',
      'btn-danger': this.variant === 'danger',
      'btn-ghost': this.variant === 'ghost',
      'btn-xs': this.size === 'xs',
      'btn-sm': this.size === 'sm',
      'btn-md': this.size === 'md',
      'btn-lg': this.size === 'lg',
      'btn-xl': this.size === 'xl',
      'btn-xxl': this.size === 'xxl'
    };
  }
}
