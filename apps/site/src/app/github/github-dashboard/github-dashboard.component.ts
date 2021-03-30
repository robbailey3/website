import { Component, OnDestroy, OnInit } from '@angular/core';
import { Notification, NotificationsService } from '@website/ui-components';
import { Subscription } from 'rxjs';
import { GithubService } from '../github.service';
import { GitHubUser } from '../interfaces/github-user';
import { GitHubUsersRepository } from '../interfaces/github-users-repositories';

@Component({
  selector: 'rob-github-dashboard',
  templateUrl: './github-dashboard.component.html',
  styleUrls: ['./github-dashboard.component.scss']
})
export class GithubDashboardComponent implements OnInit, OnDestroy {
  private $repoSubscription: Subscription;

  private $userSubscription: Subscription;

  private readonly GITHUB_USERNAME = 'robbailey3';

  public repositories: GitHubUsersRepository[];

  public user: GitHubUser;

  constructor(
    private readonly githubService: GithubService,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getRepositories();
    this.getUser();
  }

  ngOnDestroy() {
    if (this.$repoSubscription) {
      this.$repoSubscription.unsubscribe();
    }
    if (this.$userSubscription) {
      this.$userSubscription.unsubscribe();
    }
  }

  public getRepositories() {
    this.$repoSubscription = this.githubService
      .getUsersRepositories(this.GITHUB_USERNAME)
      .subscribe({
        next: (response) => {
          this.repositories = response;
        },
        error: (err) => this.handleServiceError(err)
      });
  }

  public getUser() {
    this.$userSubscription = this.githubService
      .getUser(this.GITHUB_USERNAME)
      .subscribe({
        next: (response) => {
          this.user = response;
        },
        error: (err) => this.handleServiceError(err)
      });
  }

  private handleServiceError(err: Error) {
    console.log(this);
    this.notificationsService.add(
      new Notification(`Something went wrong: ${err.message}`, 'error')
    );
  }
}
