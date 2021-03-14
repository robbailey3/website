import { Component } from '@angular/core';

interface TechnologyItem {
  name: string;
  logoSrc: string;
  description: string;
}

@Component({
  selector: 'rob-homepage-technologies',
  templateUrl: './homepage-technologies.component.html',
  styleUrls: ['./homepage-technologies.component.scss']
})
export class HomepageTechnologiesComponent {
  public technologies: TechnologyItem[] = [
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    },
    {
      name: 'Angular',
      logoSrc: '',
      description: ''
    }
  ];
}
