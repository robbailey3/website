/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService]
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: getRepos', () => {
    it('should call the listForUser method from the octokit', () => {
      // eslint-disable-next-line dot-notation
      const spy = jest.spyOn<any, any>(service['octokit'].repos, 'listForUser');

      service.getRepos();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: getCommits', () => {
    it('should call the listCommits method from the octokit', () => {
      // eslint-disable-next-line dot-notation
      const spy = jest.spyOn<any, any>(service['octokit'].repos, 'listCommits');

      service.getCommits('repoName');

      expect(spy).toHaveBeenCalled();
    });
  });
});
