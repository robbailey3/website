import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMetaService } from './services/page-meta/page-meta.service';
import { CodeHighlightDirective } from './directives/code-highlight/code-highlight.directive';

@NgModule({
  declarations: [CodeHighlightDirective],
  exports: [CodeHighlightDirective],
  providers: [PageMetaService],
  imports: [CommonModule]
})
export class SharedModule {}
