import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '@website/ui-components';
import { HomepageRootComponent } from './homepage-root/homepage-root.component';
import { HomepageBannerComponent } from './homepage-banner/homepage-banner.component';
import { HomepageIntroductionComponent } from './homepage-introduction/homepage-introduction.component';
import { HomepageCarouselComponent } from './homepage-carousel/homepage-carousel.component';
import { HomepageTechnologiesComponent } from './homepage-technologies/homepage-technologies.component';
import { TechnologyItemComponent } from './homepage-technologies/technology-item/technology-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomepageRootComponent,
    HomepageBannerComponent,
    HomepageIntroductionComponent,
    HomepageCarouselComponent,
    HomepageTechnologiesComponent,
    TechnologyItemComponent
  ],
  imports: [CommonModule, UiComponentsModule, RouterModule]
})
export class HomepageModule {}
