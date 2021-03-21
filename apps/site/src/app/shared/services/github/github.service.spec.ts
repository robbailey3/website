import { createHttpFactory, HttpMethod } from '@ngneat/spectator';

import { GithubService } from './github.service';

describe('GithubService', () => {
  const http = createHttpFactory<GithubService>(GithubService);
  const API_URL = 'https://api.github.com';
  it('should be created', () => {
    const { service } = http();

    expect(service).toBeTruthy();
  });

  describe('[METHOD]: getUsersRepositories', () => {
    it('should be defined', () => {
      const { service } = http();

      expect(service.getUsersRepositories).toBeDefined();
    });

    it('should make a http request', () => {
      const { service, expectOne } = http();
      const username = 'robbailey3';

      service.getUsersRepositories(username).subscribe();

      expectOne(`${API_URL}/users/${username}/repos`, HttpMethod.GET);
    });
  });

  describe('[METHOD]: getRepositoryBranches', () => {
    it('should be defined', () => {
      const { service } = http();

      expect(service.getRepositoryBranches).toBeDefined();
    });

    it('should make a http request', () => {
      const { service, expectOne } = http();
      const owner = 'robbailey3';
      const repository = 'website';

      service.getRepositoryBranches(owner, repository).subscribe();

      expectOne(
        `${API_URL}/repos/${owner}/${repository}/branches`,
        HttpMethod.GET
      );
    });
  });

  describe('[METHOD]: getRepositoryCommits', () => {
    it('should be defined', () => {
      const { service } = http();

      expect(service.getRepositoryCommits).toBeDefined();
    });

    it('should make a http request', () => {
      const { service, expectOne } = http();
      const owner = 'robbailey3';
      const repository = 'website';

      service.getRepositoryCommits(owner, repository).subscribe();

      expectOne(
        `${API_URL}/repos/${owner}/${repository}/commits`,
        HttpMethod.GET
      );
    });
  });
});
