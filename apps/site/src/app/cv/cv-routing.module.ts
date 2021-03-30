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
      {
        path: '',
        pathMatch: 'full',
        component: CvProfileComponent,
        data: {
          title: 'CV - Rob Bailey: Profile',
          description: 'The profile section of the online CV for Rob Bailey'
        }
      },
      {
        path: 'skills',
        component: CvSkillsComponent,
        data: {
          title: 'CV - Rob Bailey: Skills',
          description: 'The skills section of the online CV for Rob Bailey'
        }
      },
      {
        path: 'education',
        component: CvEducationComponent,
        data: {
          title: 'CV - Rob Bailey: Education',
          description: 'The education section of the online CV for Rob Bailey'
        }
      },
      {
        path: 'experience',
        component: CvExperienceComponent,
        data: {
          title: 'CV - Rob Bailey: Experience',
          description: 'The experience section of the online CV for Rob Bailey'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule {}
