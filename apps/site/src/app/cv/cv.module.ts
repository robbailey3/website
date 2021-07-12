import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiComponentsModule } from '@website/ui-components';
import { CvRoutingModule } from './cv-routing.module';
import { CvRootComponent } from './cv-root/cv-root.component';
import { CvSkillsComponent } from './cv-skills/cv-skills.component';
import { CvExperienceComponent } from './cv-experience/cv-experience.component';
import { CvEducationComponent } from './cv-education/cv-education.component';
import { CvProfileComponent } from './cv-profile/cv-profile.component';
import { CvNavigationComponent } from './cv-navigation/cv-navigation.component';
import { CvJsonComponent } from './cv-json/cv-json.component';
import { SharedModule } from '../shared/shared.module';
import { CvSkillItemComponent } from './cv-skill-item/cv-skill-item.component';

@NgModule({
  declarations: [
    CvRootComponent,
    CvSkillsComponent,
    CvExperienceComponent,
    CvEducationComponent,
    CvProfileComponent,
    CvNavigationComponent,
    CvJsonComponent,
    CvSkillItemComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    FontAwesomeModule,
    SharedModule,
    UiComponentsModule
  ]
})
export class CvModule {}
