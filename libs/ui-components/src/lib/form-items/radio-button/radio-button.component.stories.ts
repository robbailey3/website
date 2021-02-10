import { RadioButtonComponent } from './radio-button.component';

export default {
  title: 'Form Items/Radio Button'
};

export const RadioButton = (args: RadioButtonComponent) => ({
  moduleMetadata: {
    imports: [],
    declarations: [RadioButtonComponent]
  },
  component: RadioButtonComponent,
  props: { ...args },
  template: `
  <form ngForm #form="ngForm">
    <rob-radio-button
      [label]="label"
      [id]="id"
      [name]="name" 
      [options]="options"
      [helperText]="helperText"
      [required]="required"
      [(ngModel)]="value"></rob-radio-button>
  </form>`
});

RadioButton.args = {
  label: 'Label',
  id: 'id',
  name: 'name',
  options: [
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
    { key: 'Option 4', value: 'option4' }
  ],
  helperText: 'Helper text',
  required: true,
  value: 'option3'
} as RadioButtonComponent;
