import { Component } from '@angular/core';
import { fadeInDownOnEnterAnimation } from 'angular-animations';
import { CV } from '../cv';

@Component({
  selector: 'rob-cv-skills',
  templateUrl: './cv-skills.component.html',
  styleUrls: ['./cv-skills.component.scss'],
  animations: [fadeInDownOnEnterAnimation()]
})
export class CvSkillsComponent {
  public skills = CV.skills.map((skillCategory) => ({
    title: skillCategory.title,
    skills: skillCategory.skills.sort(
      (skillA, skillB) => skillB.rating - skillA.rating
    )
  }));
}
