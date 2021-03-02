import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '@whisky-tracker/ui-components';
import { HomepageRootComponent } from './homepage-root/homepage-root.component';
import { HomepageBannerComponent } from './homepage-banner/homepage-banner.component';

@NgModule({
  declarations: [HomepageRootComponent, HomepageBannerComponent],
  imports: [CommonModule, UiComponentsModule]
})
export class HomepageModule {}
