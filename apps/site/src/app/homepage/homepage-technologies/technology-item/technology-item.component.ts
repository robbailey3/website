import { Component, Input } from '@angular/core';
import { fadeInUpOnEnterAnimation } from 'angular-animations';
import { TechnologyItem } from './technology-item.interface';

@Component({
  selector: 'rob-technology-item',
  templateUrl: './technology-item.component.html',
  styleUrls: ['./technology-item.component.scss'],
  animations: [fadeInUpOnEnterAnimation({ duration: 500, translate: '50px' })]
})
export class TechnologyItemComponent {
  @Input() item: TechnologyItem;

  @Input() animationDelay = 0;

  public hasEnteredScreen = false;

  public viewPortListener() {
    this.hasEnteredScreen = true;
  }
}
