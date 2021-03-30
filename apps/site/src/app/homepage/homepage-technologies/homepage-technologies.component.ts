import { Component } from '@angular/core';
import { TechnologyItem } from './technology-item/technology-item.interface';
import { technologies } from './technologies';
@Component({
  selector: 'rob-homepage-technologies',
  templateUrl: './homepage-technologies.component.html',
  styleUrls: ['./homepage-technologies.component.scss']
})
export class HomepageTechnologiesComponent {
  public technologies: TechnologyItem[] = technologies;
}
