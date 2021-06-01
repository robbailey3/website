import { Component } from '@angular/core';
import { CV } from '../cv';

@Component({
  selector: 'rob-cv-skills',
  templateUrl: './cv-skills.component.html',
  styleUrls: ['./cv-skills.component.scss']
})
export class CvSkillsComponent {
  public skills = CV.skills;
}
