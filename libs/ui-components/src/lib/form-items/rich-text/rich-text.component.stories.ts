import { EditorModule } from '@tinymce/tinymce-angular';
import { RichTextComponent } from './rich-text.component';

export default {
  title: 'Form Items/Rich Text'
};

export const RichText = (args: RichTextComponent) => ({
  moduleMetadata: {
    imports: [EditorModule],
    declarations: [RichTextComponent]
  },
  component: RichTextComponent,
  props: { ...args },
  template: `
  <form ngForm #form="ngForm">
    <rob-rich-text
      [label]="label"
      [id]="id"
      [name]="name" 
      [config]="config"
      [helperText]="helperText"
      [required]="required"
      [minLength]="minLength"
      [maxLength]="maxLength"
      [disabled]="disabled"
      [(ngModel)]="value"></rob-rich-text>
  </form>`
});

RichText.args = {
  helperText: 'Helper text',
  id: 'id',
  label: 'Label',
  name: 'name',
  required: true,
  value: '',
  config: {
    height: 400,
    plugins: `print preview searchreplace autolink directionality emoticons
      visualblocks visualchars fullscreen image link template table codesample
    charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists
      wordcount imagetools textpattern help code`,
    toolbar: `formatselect | bold italic strikethrough underline
      | link image media codesample | alignleft aligncenter
      alignright alignjustify  | numlist bullist outdent indent | removeformat code`,
    image_caption: true,
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'Typescript', value: 'typescript' },
      { text: 'CSS', value: 'css' },
      { text: 'SCSS', value: 'scss' },
      { text: 'PHP', value: 'php' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' }
    ],
    style_formats: [
      { title: 'code', block: 'pre', inline: 'code', classes: 'prettyprint' }
    ],
    style_formats_merge: true
  },
  maxLength: 200,
  minLength: 100,
  disabled: false
} as RichTextComponent;
