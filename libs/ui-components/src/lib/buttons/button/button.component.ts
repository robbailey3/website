import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
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

  @Output() public buttonClick: EventEmitter<MouseEvent> = new EventEmitter();

  public handleButtonClick($event: MouseEvent) {
    this.buttonClick.emit($event);
  }
}
