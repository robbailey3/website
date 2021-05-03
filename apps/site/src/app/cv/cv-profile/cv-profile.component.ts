import { Component } from '@angular/core';
import { CV, CVProfile } from '../cv';

@Component({
  selector: 'rob-cv-profile',
  templateUrl: './cv-profile.component.html',
  styleUrls: ['./cv-profile.component.scss']
})
export class CvProfileComponent {
  public profile: CVProfile = CV.profile;
}
