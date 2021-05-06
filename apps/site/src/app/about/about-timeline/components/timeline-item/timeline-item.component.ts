import { Component, Input } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { TimelineItem } from '../../interfaces/timeline-item';

@Component({
  selector: 'rob-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent {
  @Input() public timelineItem: TimelineItem;

  public icons = { calendar: faCalendar };
}
