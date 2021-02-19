import { Story } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

export default {
  title: 'Form Items/File Upload'
};

export const FileUpload: Story<FileUploadComponent> = (
  args: FileUploadComponent
) => ({
  moduleMetadata: {
    imports: [],
    declarations: [FileUploadComponent]
  },
  component: FileUploadComponent,
  props: {
    label: args.label,
    helperText: args.helperText,
    id: args.id,
    name: args.name,
    required: args.required,
    placeholder: args.placeholder,
    value: args.value,
    minLength: args.minLength,
    maxLength: args.maxLength,
    pattern: null
  },
  template: `
  <form ngForm #form="ngForm">
    <rob-file-upload 
    [label]="label" 
    [helperText]="helperText" 
    [required]="required"
    [id]="id" 
    [name]="name" 
    [minLength]="minLength" 
    [maxLength]="maxLength" 
    [placeholder]="placeholder"
    [(ngModel)]="value"></rob-file-upload>
  <form>`
});

FileUpload.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  placeholder: 'Placeholder',
  required: true,
  minLength: 0,
  maxLength: 32,
  value: 'value',
  pattern: null
};

FileUpload.argTypes = {
  pattern: {
    control: false
  }
};
