import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { RichTextComponent } from './rich-text.component';

@Component({ selector: 'rob-richtext-wrapper' })
class RichTextWrapperComponent {
  public value = '';

  public config = {
    height: 400,
    plugins: `print preview searchreplace autolink directionality emoticons
      visualblocks visualchars fullscreen image link template table codesample
    charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists
      wordcount imagetools textpattern help code`,
    toolbar: `formatselect | bold italic strikethrough underline
      | link image media codesample | alignleft aligncenter
      alignright alignjustify  | numlist bullist outdent indent | removeformat code`,
    image_caption: true,
    style_formats: [
      { title: 'code', block: 'pre', inline: 'code', classes: 'prettyprint' }
    ],
    style_formats_merge: true
  };
}

describe('RichTextComponent', () => {
  let spectator: SpectatorHost<RichTextComponent, RichTextWrapperComponent>;

  let component: RichTextComponent;

  const hostFactory = createHostFactory({
    component: RichTextComponent,
    host: RichTextWrapperComponent,
    imports: [FormsModule, EditorModule]
  });

  beforeEach(() => {
    spectator = hostFactory(`
  <form ngForm #form="ngForm">
    <rob-rich-text
      label="label"
      id="test-id"
      name="name" 
      [config]="config"
      helperText="helperText"
      required="true"
      minLength="10"
      maxLength="200"
      disabled="false"
      [(ngModel)]="value"></rob-rich-text>
  </form>`);
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the model on change', () => {
    // TODO: Work out how to input values into the tinyMCE input
    spectator.component.value = 'Hello World';

    spectator.component.change();

    expect(spectator.hostComponent.value).toEqual('Hello World');
  });
});
