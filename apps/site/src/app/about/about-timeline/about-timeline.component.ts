import { Component, OnInit } from '@angular/core';
import { timelineItems } from './data/timeline-items';
@Component({
  selector: 'rob-about-timeline',
  templateUrl: './about-timeline.component.html',
  styleUrls: ['./about-timeline.component.scss']
})
export class AboutTimelineComponent implements OnInit {
  public startYear: number;

  public endYear: number;

  public timeline = timelineItems.sort(
    (a, b) => b.from.getTime() - a.from.getTime()
  );

  public totalMonths: number;

  public calculateStartYear(): number {
    return Math.min(...this.timeline.map((item) => item.from.getFullYear()));
  }

  public calculateEndYear(): number {
    return Math.max(...this.timeline.map((item) => item.to.getFullYear()));
  }

  public ngOnInit() {
    this.startYear = this.calculateStartYear();
    this.endYear = this.calculateEndYear();
    this.totalMonths = this.monthDiff(
      this.timeline[0].from,
      this.timeline[this.timeline.length - 1].to
    );
  }

  public monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return Math.abs(months);
  }
}
