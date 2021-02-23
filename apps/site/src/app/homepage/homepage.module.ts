import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRootComponent } from './homepage-root/homepage-root.component';
import { HomepageBannerComponent } from './homepage-banner/homepage-banner.component';



@NgModule({
  declarations: [HomepageRootComponent, HomepageBannerComponent],
  imports: [
    CommonModule
  ]
})
export class HomepageModule { }
