import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRootComponent } from './about-root/about-root.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutBasicsComponent } from './about-basics/about-basics.component';
import { AboutTimelineComponent } from './about-timeline/about-timeline.component';
import { AboutInterestsComponent } from './about-interests/about-interests.component';
import { AboutSkillsComponent } from './about-skills/about-skills.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { TimelineItemComponent } from './about-timeline/components/timeline-item/timeline-item.component';

@NgModule({
  declarations: [
    AboutRootComponent,
    AboutBasicsComponent,
    AboutTimelineComponent,
    AboutInterestsComponent,
    AboutSkillsComponent,
    AboutProjectComponent,
    TimelineItemComponent
  ],
  imports: [CommonModule, AboutRoutingModule]
})
export class AboutModule {}
