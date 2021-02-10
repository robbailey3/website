import { Component, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../notification.class';

@Component({
  selector: 'rob-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notification: Notification;

  public faTimes = faTimes;

  public handleClose() {
    this.notification.hide();
  }
}
