import { Component } from '@angular/core';
import { interests } from './interests';

@Component({
  selector: 'rob-about-interests',
  templateUrl: './about-interests.component.html',
  styleUrls: ['./about-interests.component.scss']
})
export class AboutInterestsComponent {
  public interests = interests;
}
