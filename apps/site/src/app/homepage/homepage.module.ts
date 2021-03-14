import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '@website/ui-components';
import { HomepageRootComponent } from './homepage-root/homepage-root.component';
import { HomepageBannerComponent } from './homepage-banner/homepage-banner.component';
import { HomepageIntroductionComponent } from './homepage-introduction/homepage-introduction.component';
import { HomepageCarouselComponent } from './homepage-carousel/homepage-carousel.component';
import { HomepageTechnologiesComponent } from './homepage-technologies/homepage-technologies.component';

@NgModule({
  declarations: [
    HomepageRootComponent,
    HomepageBannerComponent,
    HomepageIntroductionComponent,
    HomepageCarouselComponent,
    HomepageTechnologiesComponent
  ],
  imports: [CommonModule, UiComponentsModule]
})
export class HomepageModule {}
