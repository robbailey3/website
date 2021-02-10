import { Component, Input } from '@angular/core';

@Component({
  selector: 'rob-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() title: string;

  @Input() id: string;

  @Input() isActive = false;
}
