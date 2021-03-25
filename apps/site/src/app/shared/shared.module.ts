import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMetaService } from './services/page-meta/page-meta.service';

@NgModule({
  declarations: [],
  providers: [PageMetaService],
  imports: [CommonModule]
})
export class SharedModule {}
