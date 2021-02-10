import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from './notification.class';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public $notifications: BehaviorSubject<Notification[]> = new BehaviorSubject(
    []
  );

  public add(notification: Notification) {
    this.$notifications.next([...this.$notifications.getValue(), notification]);
  }
}
