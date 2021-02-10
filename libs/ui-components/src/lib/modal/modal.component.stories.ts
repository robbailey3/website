import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata, Story } from '@storybook/angular';
import { ButtonsModule } from '../buttons/buttons.module';
import { FocusTrapDirective } from '../focus-trap/focus-trap.directive';

import { ModalComponent } from './modal.component';

type ModalArgs = ModalComponent & { modalContent: string };

export default {
  title: 'Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [ModalComponent, FocusTrapDirective],
      imports: [FontAwesomeModule, ButtonsModule]
    })
  ]
};

const Template: Story<ModalComponent> = (args: ModalArgs) => {
  return {
    component: ModalComponent,
    props: { state: args.state, modalContent: args.modalContent },
    template: `<rob-modal [state]="state"><div [innerHTML]="modalContent" style="padding: 2rem"></div></rob-modal>`
  };
};

export const Modal: Story<ModalArgs> = Template.bind({});

Modal.args = {
  state: 'open',
  modalContent: `<h1>Title</h1>`
};

Modal.argTypes = {
  state: {
    control: {
      type: 'select',
      options: ['open', 'closed']
    }
  }
};
