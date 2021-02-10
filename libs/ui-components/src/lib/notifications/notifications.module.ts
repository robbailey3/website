import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '../buttons/buttons.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationsService } from './notifications.service';
import { NotificationContainerComponent } from './notification-container/notification-container.component';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  imports: [CommonModule, ButtonsModule],
  providers: [NotificationsService],
  exports: [NotificationComponent, NotificationContainerComponent]
})
export class NotificationsModule {}
