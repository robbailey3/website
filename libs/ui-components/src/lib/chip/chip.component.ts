import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rob-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChipComponent {
  public faTimes = faTimes;

  @Input() title: string;

  @Input() dismissable = false;

  @Input() type:
    | 'portafino'
    | 'fire'
    | 'sahara-sand'
    | 'glade-green'
    | 'black-pearl';

  @Output() handleDismiss: EventEmitter<void> = new EventEmitter();

  public onDismissClick() {
    this.handleDismiss.emit();
  }
}
