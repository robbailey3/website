import { Component } from '@angular/core';
import { Projects } from '../../projects';

@Component({
  selector: 'rob-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent {
  public projects = Projects;
}
