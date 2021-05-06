import { Component } from '@angular/core';
import { CV, CVModel } from '../cv';

@Component({
  selector: 'rob-cv-root',
  templateUrl: './cv-root.component.html',
  styleUrls: ['./cv-root.component.scss']
})
export class CvRootComponent {
  public cv: CVModel = CV;
}
