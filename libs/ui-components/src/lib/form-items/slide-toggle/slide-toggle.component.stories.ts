import { Story } from '@storybook/angular';
import { SlideToggleComponent } from './slide-toggle.component';

export default {
  title: 'Form Items/Slide Toggle'
};

export const SlideToggle: Story<SlideToggleComponent> = (
  args: SlideToggleComponent
) => ({
  moduleMetadata: {
    imports: [],
    declarations: [SlideToggleComponent]
  },
  component: SlideToggleComponent,
  props: { ...args },
  template: `
  <form ngForm #form="ngForm">
    <rob-slide-toggle
    [label]="label" 
    [helperText]="helperText" 
    [required]="required"
    [id]="id" 
    [name]="name" 
    [(ngModel)]="value"></rob-slide-toggle>
  <form>`
});

SlideToggle.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  required: true,
  value: true
};
