import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitHubRepositoryBranch } from './interfaces/github-repository-branches';
import { GitHubRepositoryCommit } from './interfaces/github-repository-commits';
import { GitHubUsersRepository } from './interfaces/github-users-repositories';
import { GitHubUser } from './interfaces/github-user';

type GetUsersRepositoriesParams = {
  // eslint-disable-next-line camelcase
  per_page?: number;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  page?: number;
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly API_BASE = 'https://apidd.github.com';

  constructor(private readonly http: HttpClient) {}

  public getUsersRepositories(
    username: string,
    options: GetUsersRepositoriesParams = {
      sort: 'pushed',
      page: 1,
      per_page: 25,
      direction: 'desc'
    }
  ): Observable<GitHubUsersRepository[]> {
    const params = new HttpParams()
      .set('per_page', String(options.per_page))
      .set('sort', options.sort)
      .set('direction', options.direction)
      .set('page', String(options.page));

    return this.http.get<GitHubUsersRepository[]>(
      `${this.API_BASE}/users/${username}/repos`,
      { params }
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
