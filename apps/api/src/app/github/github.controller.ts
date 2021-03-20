import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repos')
  public getRepos() {
    return this.githubService.getRepos();
  }

  @Get('commits/:repo')
  public getCommits(@Param('repo') repo: string) {
    return this.githubService.getCommits(repo);
  }
}
