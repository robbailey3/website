import { Component } from '@angular/core';
import {
  NotificationsService,
  Notification
} from '@whisky-tracker/ui-components';

@Component({
  selector: 'rob-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public i = 0;

  constructor(private notificationsService: NotificationsService) {}

  public addNotification() {
    this.notificationsService.add(
      new Notification(`This is notification #${this.i}`, 'success')
    );
    this.i += 1;
  }
}
