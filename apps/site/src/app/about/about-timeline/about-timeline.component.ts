import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { timelineItems } from './data/timeline-items';
import { TimelineItem } from './interfaces/timeline-item';
@Component({
  selector: 'rob-about-timeline',
  templateUrl: './about-timeline.component.html',
  styleUrls: ['./about-timeline.component.scss']
})
export class AboutTimelineComponent implements OnInit, AfterViewInit {
  public startYear: number;

  public endYear: number;

  public timeline = timelineItems.sort(
    (a, b) => a.from.getTime() - b.from.getTime()
  );

  public scrollLevel = 0;

  public yearsPerViewWidth = 4;

  constructor(@Inject(WINDOW) public window: Window) {}

  @ViewChild('timelineWrapper')
  public timelineWrapper: ElementRef<HTMLDivElement>;

  @ViewChild('timelineInner')
  public timelineInner: ElementRef<HTMLDivElement>;

  @HostListener('window:scroll')
  public handleScroll() {
    const wrapperPosition = this.timelineWrapper.nativeElement.getBoundingClientRect();
    this.scrollLevel = Math.max(this.window.scrollY - wrapperPosition.y, 0);
    this.timelineInner.nativeElement.style.transform = `translateX(-${this.scrollLevel}px)`;
    this.timelineInner.nativeElement.style.top = `${this.scrollLevel / 2}px`;
  }

  public calculateStartYear(): number {
    return Math.min(...this.timeline.map((item) => item.from.getFullYear()));
  }

  public calculateEndYear(): number {
    return Math.max(...this.timeline.map((item) => item.to.getFullYear()));
  }

  public calculateItemPosition(timelineItem: TimelineItem): number {
    const relativeStartYear = timelineItem.from.getFullYear() - this.startYear;
    const deltaX =
      (this.window.innerWidth / this.yearsPerViewWidth) * relativeStartYear;
    return deltaX;
  }

  public calculateItemWidth(timelineItem: TimelineItem): number {
    return (
      ((timelineItem.to.getFullYear() - timelineItem.from.getFullYear()) / 4) *
      this.window.innerWidth
    );
  }

  public ngOnInit() {
    this.startYear = this.calculateStartYear();
    this.endYear = this.calculateEndYear();
    console.log(this.timelineWrapper);
  }

  public ngAfterViewInit() {
    this.timelineWrapper.nativeElement.style.height = `${
      this.timelineInner.nativeElement.getBoundingClientRect().width / 2
    }px`;
  }
}
