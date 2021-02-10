import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

export const parameters = {
  layout: 'centered'
};
