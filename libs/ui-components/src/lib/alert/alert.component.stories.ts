import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '../buttons/buttons.module';
import { AlertComponent } from './alert.component';

export default {
  title: 'Alert'
};

export const Alert = (args: AlertComponent) => ({
  moduleMetadata: {
    imports: [FontAwesomeModule, ButtonsModule],
    declarations: [AlertComponent]
  },
  component: AlertComponent,
  props: {
    ...args
  },
  template: `<rob-alert [content]="content" [variant]="variant" [dismissable]="dismissable">Chip</rob-alert>`
});

Alert.args = {
  content: 'Alert Content',
  variant: 'info',
  dismissable: true
} as AlertComponent;

Alert.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: ['info', 'success', 'error', 'warning']
    }
  }
};
