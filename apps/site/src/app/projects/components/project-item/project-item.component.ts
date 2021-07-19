import { Component, Input } from '@angular/core';
import { fadeInDownOnEnterAnimation } from 'angular-animations';
import { Project } from '../../project';

@Component({
  selector: 'rob-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [fadeInDownOnEnterAnimation({ duration: 100 })]
})
export class ProjectItemComponent {
  @Input() project: Project;
}
