import { Story } from '@storybook/angular';
import { TextInputComponent } from './text-input.component';

export default {
  title: 'Form Items/Text Input'
};

export const TextInput: Story<TextInputComponent> = (
  args: TextInputComponent
) => ({
  moduleMetadata: {
    imports: [],
    declarations: [TextInputComponent]
  },
  component: TextInputComponent,
  props: {
    label: args.label,
    helperText: args.helperText,
    id: args.id,
    name: args.name,
    type: args.type,
    required: args.required,
    placeholder: args.placeholder,
    value: args.value,
    minLength: args.minLength,
    maxLength: args.maxLength,
    pattern: null
  },
  template: `
  <form ngForm #form="ngForm">
    <rob-text-input 
    [label]="label" 
    [helperText]="helperText" 
    [required]="required"
    [id]="id" 
    [name]="name" 
    [type]="type" 
    [minLength]="minLength" 
    [maxLength]="maxLength" 
    [placeholder]="placeholder"
    [(ngModel)]="value"></rob-text-input>
  <form>`
});

TextInput.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  placeholder: 'Placeholder',
  required: true,
  minLength: 0,
  maxLength: 32,
  type: 'text',
  value: 'value',
  pattern: null
};

TextInput.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['text', 'email', 'password', 'search']
    }
  },
  pattern: {
    control: false
  }
};
