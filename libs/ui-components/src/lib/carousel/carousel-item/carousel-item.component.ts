import { Component } from '@angular/core';
import {
  fadeInRightOnEnterAnimation,
  fadeOutLeftOnLeaveAnimation
} from 'angular-animations';

@Component({
  selector: 'rob-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  animations: [
    fadeInRightOnEnterAnimation({
      delay: 200,
      duration: 200,
      translate: '10%'
    }),
    fadeOutLeftOnLeaveAnimation({ duration: 100, translate: '10%' })
  ]
})
export class CarouselItemComponent {
  public isActive = false;
}
