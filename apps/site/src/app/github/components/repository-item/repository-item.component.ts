import { Component, Input } from '@angular/core';
import { faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { GitHubUsersRepository } from '../../interfaces/github-users-repositories';

@Component({
  selector: 'rob-repository-item',
  templateUrl: './repository-item.component.html',
  styleUrls: ['./repository-item.component.scss']
})
export class RepositoryItemComponent {
  @Input() repository: GitHubUsersRepository;

  public icons = {
    faStar,
    faCodeBranch
  };
}
