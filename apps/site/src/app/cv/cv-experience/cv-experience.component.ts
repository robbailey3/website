import { Component } from '@angular/core';
import { fadeInDownOnEnterAnimation } from 'angular-animations';
import { CV } from '../cv';

@Component({
  selector: 'rob-cv-experience',
  templateUrl: './cv-experience.component.html',
  styleUrls: ['./cv-experience.component.scss'],
  animations: [fadeInDownOnEnterAnimation({ duration: 500 })]
})
export class CvExperienceComponent {
  public experienceItems = CV.experience;

  public dateIsPresent(date: Date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
