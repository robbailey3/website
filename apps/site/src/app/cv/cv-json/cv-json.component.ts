import { Component } from '@angular/core';
import { CV, CVModel } from '../cv';

@Component({
  selector: 'rob-cv-json',
  templateUrl: './cv-json.component.html',
  styleUrls: ['./cv-json.component.scss']
})
export class CvJsonComponent {
  public cv: CVModel = CV;
}
