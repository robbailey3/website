import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

jest.mock('./github.service');

describe('GithubController', () => {
  let controller: GithubController;
  let service: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [GithubService]
    }).compile();

    controller = module.get<GithubController>(GithubController);
    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: getRepos', () => {
    it('should be defined', () => {
      expect(controller.getRepos).toBeDefined();
    });
    it('should call githubService->getRepos', () => {
      const spy = jest.spyOn(service, 'getRepos');

      controller.getRepos();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: getCommits', () => {
    it('should be defined', () => {
      expect(controller.getCommits).toBeDefined();
    });

    it('should call githubService->getCommits', () => {
      const spy = jest.spyOn(service, 'getCommits');

      controller.getCommits('repoName');

      expect(spy).toHaveBeenCalled();
    });

    it('should call githubService->getCommits with the name of the repo', () => {
      const spy = jest.spyOn(service, 'getCommits');

      const repoName = 'repoName';

      controller.getCommits(repoName);

      expect(spy).toHaveBeenCalledWith(repoName);
    });
  });
});
