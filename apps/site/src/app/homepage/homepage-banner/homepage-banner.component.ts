import { Component } from '@angular/core';
import {
  fadeInDownOnEnterAnimation,
  fadeInOnEnterAnimation
} from 'angular-animations';

@Component({
  selector: 'rob-homepage-banner',
  templateUrl: './homepage-banner.component.html',
  styleUrls: ['./homepage-banner.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ duration: 2000 }),
    fadeInDownOnEnterAnimation({ duration: 1000, delay: 200 })
  ]
})
export class HomepageBannerComponent {}
