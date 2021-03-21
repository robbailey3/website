import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubRepositoryBranches } from './interfaces/github-repository-branches';
import { GitHubRepositoryCommits } from './interfaces/github-repository-commits';
import { GitHubUsersRepositories } from './interfaces/github-users-repositories';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly API_BASE = 'https://api.github.com';

  constructor(private readonly http: HttpClient) {}

  public getUsersRepositories(
    username: string
  ): Observable<GitHubUsersRepositories> {
    return this.http.get<GitHubUsersRepositories>(
      `${this.API_BASE}/users/${username}/repos`
    );
  }

  public getRepositoryBranches(
    owner: string,
    repository: string
  ): Observable<GitHubRepositoryBranches> {
    return this.http.get<GitHubRepositoryBranches>(
      `${this.API_BASE}/repos/${owner}/${repository}/branches`
    );
  }

  public getRepositoryCommits(
    owner: string,
    repository: string
  ): Observable<GitHubRepositoryCommits> {
    return this.http.get<GitHubRepositoryCommits>(
      `${this.API_BASE}/repos/${owner}/${repository}/commits`
    );
  }
}
