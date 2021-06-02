import { Component } from '@angular/core';
import { CV } from '../cv';

@Component({
  selector: 'rob-cv-experience',
  templateUrl: './cv-experience.component.html',
  styleUrls: ['./cv-experience.component.scss']
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
