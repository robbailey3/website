import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineLoaderComponent } from './inline-loader/inline-loader.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [InlineLoaderComponent, PageLoaderComponent, LoaderComponent],
  imports: [
    CommonModule
  ]
})
export class LoaderModule { }
