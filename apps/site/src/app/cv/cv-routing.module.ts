import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvEducationComponent } from './cv-education/cv-education.component';
import { CvExperienceComponent } from './cv-experience/cv-experience.component';
import { CvProfileComponent } from './cv-profile/cv-profile.component';
import { CvRootComponent } from './cv-root/cv-root.component';
import { CvSkillsComponent } from './cv-skills/cv-skills.component';

const routes: Routes = [
  {
    path: '',
    component: CvRootComponent,
    children: [
      { path: '', pathMatch: 'full', component: CvProfileComponent },
      { path: 'skills', component: CvSkillsComponent },
      { path: 'education', component: CvEducationComponent },
      { path: 'experience', component: CvExperienceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule {}
