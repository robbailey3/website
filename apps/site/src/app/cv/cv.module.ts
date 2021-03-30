import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvRootComponent } from './cv-root/cv-root.component';
import { CvSkillsComponent } from './cv-skills/cv-skills.component';
import { CvExperienceComponent } from './cv-experience/cv-experience.component';
import { CvEducationComponent } from './cv-education/cv-education.component';
import { CvProfileComponent } from './cv-profile/cv-profile.component';
import { CvNavigationComponent } from './cv-navigation/cv-navigation.component';

@NgModule({
  declarations: [
    CvRootComponent,
    CvSkillsComponent,
    CvExperienceComponent,
    CvEducationComponent,
    CvProfileComponent,
    CvNavigationComponent
  ],
  imports: [CommonModule, CvRoutingModule]
})
export class CvModule {}
