import { Component, Input } from '@angular/core';
import {
  faMapMarkerAlt,
  faBriefcase,
  faCalendarAlt,
  faFolder
} from '@fortawesome/free-solid-svg-icons';
import { GitHubUser } from '../../interfaces/github-user';

@Component({
  selector: 'rob-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() public user: GitHubUser;

  public icons = {
    faMapMarkerAlt,
    faBriefcase,
    faCalendarAlt,
    faFolder
  };
}
