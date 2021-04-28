import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '@website/ui-components';
import { AboutRootComponent } from './about-root/about-root.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutBasicsComponent } from './about-basics/about-basics.component';
import { AboutTimelineComponent } from './about-timeline/about-timeline.component';
import { TimelineItemComponent } from './about-timeline/components/timeline-item/timeline-item.component';

@NgModule({
  declarations: [
    AboutRootComponent,
    AboutBasicsComponent,
    AboutTimelineComponent,
    TimelineItemComponent,
  ],
  imports: [CommonModule, AboutRoutingModule, UiComponentsModule]
})
export class AboutModule {}
