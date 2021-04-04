import { Component } from '@angular/core';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faStackOverflow,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'rob-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public readonly icons = {
    github: faGithub,
    linkedin: faLinkedin,
    twitter: faTwitter,
    instagram: faInstagram,
    stackoverflow: faStackOverflow
  };
}
