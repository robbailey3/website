import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  ViewChild
} from '@angular/core';

import { FadeInOnEnter, FadeOutOnLeave } from '../animations';

type TooltipConfig = {
  host: HTMLElement;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
};

@Component({
  selector: 'rob-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [FadeInOnEnter('400ms'), FadeOutOnLeave('400ms')]
})
export class TooltipComponent implements AfterViewChecked {
  @ViewChild('tooltipElement', { static: false })
  tooltipElement: ElementRef<HTMLSpanElement>;

  public offset = 10;

  constructor(@Inject('tooltipConfig') public config: TooltipConfig) {}

  public ngAfterViewChecked() {
    this.calculatePosition();
  }

  public calculatePosition() {
    const hostPosition = this.config.host.getBoundingClientRect();

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const tooltipPosition = this.tooltipElement.nativeElement.getBoundingClientRect();

    let top: number;

    let left: number;

    if (this.config.position === 'top') {
      top = hostPosition.top - tooltipPosition.height - this.offset;
      left =
        hostPosition.left + (hostPosition.width - tooltipPosition.width) / 2;
    }

    if (this.config.position === 'bottom') {
      top = hostPosition.bottom + this.offset;
      left =
        hostPosition.left + (hostPosition.width - tooltipPosition.width) / 2;
    }

    if (this.config.position === 'left') {
      top =
        hostPosition.top + (hostPosition.height - tooltipPosition.height) / 2;
      left = Math.max(
        hostPosition.left - tooltipPosition.width - this.offset,
        0
      );
    }

    if (this.config.position === 'right') {
      top =
        hostPosition.top + (hostPosition.height - tooltipPosition.height) / 2;
      left = hostPosition.right + this.offset;
    }

    this.tooltipElement.nativeElement.style.left = `${left}px`;
    this.tooltipElement.nativeElement.style.top = `${top + scrollPosition}px`;
  }
}
