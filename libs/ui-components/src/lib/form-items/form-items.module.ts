import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TextInputComponent } from './text-input/text-input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SelectComponent } from './select/select.component';
import { WordCountDirective } from './validators/word-count.directive';
import { RichTextComponent } from './rich-text/rich-text.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    TextInputComponent,
    RadioButtonComponent,
    TextareaComponent,
    FileUploadComponent,
    SelectComponent,
    SlideToggleComponent,
    WordCountDirective,
    RichTextComponent,
    SliderComponent
  ],
  exports: [
    TextInputComponent,
    RadioButtonComponent,
    TextareaComponent,
    FileUploadComponent,
    SlideToggleComponent,
    SelectComponent,
    WordCountDirective,
    RichTextComponent,
    SliderComponent
  ],
  providers: [],
  imports: [CommonModule, FormsModule, EditorModule]
})
export class FormItemsModule {}
