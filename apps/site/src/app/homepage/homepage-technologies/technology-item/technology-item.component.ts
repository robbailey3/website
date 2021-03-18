import { Component, Input } from '@angular/core';
import { TechnologyItem } from './technology-item.interface';

@Component({
  selector: 'rob-technology-item',
  templateUrl: './technology-item.component.html',
  styleUrls: ['./technology-item.component.scss']
})
export class TechnologyItemComponent {
  @Input() item: TechnologyItem;

  public hasEnteredScreen = false;

  public viewPortListener() {
    this.hasEnteredScreen = true;
  }
}
