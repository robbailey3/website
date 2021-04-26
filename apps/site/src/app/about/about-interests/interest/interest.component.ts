import { Component, Input } from '@angular/core';
import { interest } from '../interests';

@Component({
  selector: 'rob-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent {
  @Input() interest: interest;
}
