import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Notification as NotificationClass } from '../notification.class';
import { ButtonsModule } from '../../buttons/buttons.module';
import { NotificationComponent } from './notification.component';

type NotificationArgs = {
  content: string;
  type: 'success' | 'error' | 'warning' | 'info';
  autoDismiss: boolean;
  autoDismissTimeout: 10000;
  isActive: boolean;
};

export default {
  title: 'Notification'
};

export const Notification = (args: NotificationArgs) => ({
  moduleMetadata: {
    imports: [FontAwesomeModule, ButtonsModule]
  },
  component: NotificationComponent,
  props: {
    notification: new NotificationClass(
      args.content,
      args.type,
      args.autoDismiss,
      args.autoDismissTimeout,
      args.isActive
    )
  }
});

Notification.args = {
  content: 'Content',
  type: 'success',
  autoDismiss: true,
  autoDismissTimeout: 10000,
  isActive: true
} as NotificationArgs;

Notification.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['success', 'error', 'warning', 'info']
    }
  }
};
