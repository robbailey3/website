import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GithubService } from './github.service';

@Controller('github')
@ApiTags('GitHub')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('repos')
  @ApiOperation({
    description:
      'Fetch the latest 100 repos (ordered by last push) from @github/robbailey3',
    summary: 'Get git repositories'
  })
  public getRepos() {
    return this.githubService.getRepos();
  }

  @Get('commits/:repo')
  @ApiOperation({
    description:
      'Fetch the latest 100 commits (ordered by last push) for a specified repository from @github/robbailey3',
    summary: 'Get git commits'
  })
  @ApiParam({
    name: 'repo',
    type: String,
    required: true,
    description: 'The name of the repository'
  })
  public getCommits(@Param('repo') repo: string) {
    return this.githubService.getCommits(repo);
  }
}
