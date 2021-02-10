import { Story } from '@storybook/angular';
import { SliderComponent } from './slider.component';

export default {
  title: 'Form Items/Slider'
};

export const Slider: Story<SliderComponent> = (args: SliderComponent) => ({
  moduleMetadata: {
    imports: [],
    declarations: [SliderComponent]
  },
  component: SliderComponent,
  props: { ...args },
  template: `
  <form ngForm #form="ngForm">
    <rob-slider
    [label]="label" 
    [helperText]="helperText" 
    [required]="required"
    [min]="min"
    [max]="max"
    [step]="step"
    [id]="id" 
    [name]="name" 
    [(ngModel)]="value"></rob-slider>
  <form>`
});

Slider.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  required: true,
  value: 40,
  min: 0,
  max: 100,
  step: 2
};
