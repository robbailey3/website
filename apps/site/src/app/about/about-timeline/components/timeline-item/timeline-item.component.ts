import { Component, HostBinding, Input } from '@angular/core';
import { TimelineItem } from '../../interfaces/timeline-item';

@Component({
  selector: 'rob-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent {
  @Input() public timelineItem: TimelineItem;

  @Input() public left: number;

  @Input() public width: number;

  @HostBinding('style.left') public get leftPostion(): string {
    return `${this.left}px`;
  }

  @HostBinding('style.width') public get itemWidth(): string {
    return `${this.width}px`;
  }

  public isSameMonthAndYear(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
    );
  }

  public get endDate(): string {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long'
    });
    return this.isSameMonthAndYear(this.timelineItem.to, new Date())
      ? 'Present'
      : dateFormatter.format(this.timelineItem.to);
  }
}
