import { Component, Input, OnInit } from '@angular/core';
import { CVSkill } from '../cv';

@Component({
  selector: 'rob-cv-skill-item',
  templateUrl: './cv-skill-item.component.html',
  styleUrls: ['./cv-skill-item.component.scss']
})
export class CvSkillItemComponent {
  @Input() skill: CVSkill;

  public get ratingPercentage(): string {
    return `${this.skill.rating}%`;
  }
}
