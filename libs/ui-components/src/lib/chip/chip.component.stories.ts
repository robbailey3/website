import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '../buttons/buttons.module';
import { ChipComponent } from './chip.component';

export default {
  title: 'Chip'
};

export const Chip = (args: ChipComponent) => ({
  moduleMetadata: {
    imports: [FontAwesomeModule, ButtonsModule],
    declarations: [ChipComponent]
  },
  component: ChipComponent,
  props: {
    title: args.title,
    type: args.type,
    dismissable: args.dismissable
  },
  template: `<rob-chip [title]="title" [type]="type" [dismissable]="dismissable">Chip</rob-chip>`
});

Chip.args = {
  title: '',
  type: 'primary',
  dismissable: false
} as ChipComponent;

Chip.argTypes = {
  type: {
    control: {
      type: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'accent',
        'error',
        'dark',
        'light'
      ]
    }
  }
};
