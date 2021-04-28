import { FormsModule } from '@angular/forms';
import { WordCountDirective } from '../validators/word-count.directive';
import { TextareaComponent } from './textarea.component';

export default {
  title: 'Form Items/Textarea'
};

export const Textarea = (args: TextareaComponent) => ({
  moduleMetadata: {
    imports: [FormsModule],
    declarations: [TextareaComponent, WordCountDirective]
  },
  component: TextareaComponent,
  props: { ...args },
  template: `
  <form ngForm #form="ngForm">
    <rob-textarea
    [label]="label"
    [helperText]="helperText"
    [required]="required"
    [id]="id"
    [name]="name"
    [minLength]="minLength"
    [maxLength]="maxLength"
    [maxWordCount]="maxWordCount"
    [placeholder]="placeholder"
    [rows]="rows"
    [cols]="cols"
    [(ngModel)]="value"></rob-textarea>
  <form>`
});

Textarea.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  placeholder: 'Placeholder',
  required: true,
  minLength: 0,
  maxLength: 5000,
  maxWordCount: 500,
  value: 'value',
  rows: 4,
  cols: 20
};
