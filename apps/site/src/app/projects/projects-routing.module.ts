import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListingComponent } from './components/project-listing/project-listing.component';
import { ProjectsRootComponent } from './projects-root/projects-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProjectsRootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProjectListingComponent,
        data: {
          title: 'Project Listing - Rob Bailey',
          description:
            'A page listing the different projects and the relevant links to view them'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
