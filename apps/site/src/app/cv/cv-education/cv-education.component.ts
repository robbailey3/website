import { Component } from '@angular/core';
import { fadeInDownOnEnterAnimation } from 'angular-animations';
import { CV } from '../cv';

@Component({
  selector: 'rob-cv-education',
  templateUrl: './cv-education.component.html',
  styleUrls: ['./cv-education.component.scss'],
  animations: [fadeInDownOnEnterAnimation()]
})
export class CvEducationComponent {
  public educationItems = CV.education;

  public dateIsPresent(date: Date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
