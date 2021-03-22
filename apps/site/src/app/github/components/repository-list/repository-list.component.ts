import { Component, Input } from '@angular/core';
import { GitHubUsersRepository } from '../../interfaces/github-users-repositories';

@Component({
  selector: 'rob-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() repositories: GitHubUsersRepository[];
}
