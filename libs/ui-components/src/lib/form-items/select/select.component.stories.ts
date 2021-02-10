import { Story } from '@storybook/angular';
import { SelectComponent } from './select.component';

export default {
  title: 'Form Items/Select'
};

export const Select: Story<SelectComponent> = (args: SelectComponent) => ({
  moduleMetadata: {
    imports: [],
    declarations: [SelectComponent]
  },
  component: SelectComponent,
  props: {
    ...args
  },
  template: `
  <form ngForm #form="ngForm">
    <rob-select 
    [label]="label" 
    [helperText]="helperText" 
    [required]="required"
    [id]="id" 
    [options]="options"
    [multiple]="multiple"
    [name]="name" 
    [(ngModel)]="value"></rob-select>
  <form>`
});

Select.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  required: true,
  multiple: false,
  options: [
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' }
  ],
  value: 'option3'
};
