import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsRootComponent } from './projects-root/projects-root.component';
import { ProjectListingComponent } from './components/project-listing/project-listing.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';


@NgModule({
  declarations: [ProjectsRootComponent, ProjectListingComponent, ProjectItemComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
