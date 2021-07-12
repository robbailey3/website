import { Component, Input } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation
} from 'angular-animations';
import { CVSkill } from '../cv';

@Component({
  selector: 'rob-cv-skill-item',
  templateUrl: './cv-skill-item.component.html',
  styleUrls: ['./cv-skill-item.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()]
})
export class CvSkillItemComponent {
  @Input() skill: CVSkill;

  public tooltipState: 'active' | 'inactive' = 'inactive';

  private readonly hideTooltipDelay = 250;

  private timeout: any;

  public activateTooltip() {
    clearInterval(this.timeout);
    this.tooltipState = 'active';
  }

  public deactivateTooltip() {
    this.timeout = setTimeout(() => {
      this.tooltipState = 'inactive';
    }, this.hideTooltipDelay);
  }
}
