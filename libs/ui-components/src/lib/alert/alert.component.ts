import { Component, Input, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rob-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent {
  @Input() public variant: 'success' | 'error' | 'warning' | 'info' = 'info';

  @Input() public content: string;

  @Input() public dismissable = false;

  public faTimes = faTimes;

  public state: 'active' | 'inactive' = 'active';

  public handleDismissClick() {
    this.close();
  }

  public open() {
    this.state = 'active';
  }

  public close() {
    this.state = 'inactive';
  }
}
