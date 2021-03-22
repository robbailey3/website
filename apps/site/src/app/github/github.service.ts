import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubRepositoryBranch } from './interfaces/github-repository-branches';
import { GitHubRepositoryCommit } from './interfaces/github-repository-commits';
import { GitHubUsersRepository } from './interfaces/github-users-repositories';
import { GitHubUser } from './interfaces/github-user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly API_BASE = 'https://api.github.com';

  constructor(private readonly http: HttpClient) {}

  public getUsersRepositories(
    username: string
  ): Observable<GitHubUsersRepository[]> {
    return this.http.get<GitHubUsersRepository[]>(
      `${this.API_BASE}/users/${username}/repos`
    );
  }

  public getRepositoryBranches(
    owner: string,
    repository: string
  ): Observable<GitHubRepositoryBranch[]> {
    return this.http.get<GitHubRepositoryBranch[]>(
      `${this.API_BASE}/repos/${owner}/${repository}/branches`
    );
  }

  public getRepositoryCommits(
    owner: string,
    repository: string
  ): Observable<GitHubRepositoryCommit[]> {
    return this.http.get<GitHubRepositoryCommit[]>(
      `${this.API_BASE}/repos/${owner}/${repository}/commits`
    );
  }

  public getUser(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.API_BASE}/users/${username}`);
  }
}
