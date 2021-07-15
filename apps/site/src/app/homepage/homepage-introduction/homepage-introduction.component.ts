import { Component } from '@angular/core';
import { fadeInRightAnimation } from 'angular-animations';

@Component({
  selector: 'rob-homepage-introduction',
  templateUrl: './homepage-introduction.component.html',
  styleUrls: ['./homepage-introduction.component.scss'],
  animations: [fadeInRightAnimation({ duration: 300 })]
})
export class HomepageIntroductionComponent {
  public textIsInView = false;

  public handleViewportListener() {
    this.textIsInView = true;
  }
}
