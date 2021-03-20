import { Injectable } from '@nestjs/common';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  public getRepos(): Observable<
    RestEndpointMethodTypes['repos']['listForUser']['response']['data']
  > {
    return from(
      this.octokit.repos.listForUser({ username: 'robbailey3', sort: 'pushed' })
    ).pipe(map((response) => response.data));
  }

  public getCommits(
    repo: string
  ): Observable<
    RestEndpointMethodTypes['repos']['listCommits']['response']['data']
  > {
    return from(
      this.octokit.repos.listCommits({
        owner: 'robbailey3',
        repo
      })
    ).pipe(map((response) => response.data));
  }
}
