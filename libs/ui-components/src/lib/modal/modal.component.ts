import { Component, Input, HostListener } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public faTimes = faTimes;

  @Input() public state: 'open' | 'closed';

  @HostListener('window:keyup', ['$event'])
  public onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  public close() {
    this.state = 'closed';
  }
}
