import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRootComponent } from './about-root/about-root.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutRootComponent],
  imports: [CommonModule, AboutRoutingModule]
})
export class AboutModule {}
