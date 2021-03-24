import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import MockUserRepos from '../../../__mocks__/github/github-user-repos.mock';
import { RepositoryListComponent } from './repository-list.component';

describe('RepositoryListComponent', () => {
  let spectator: Spectator<RepositoryListComponent>;
  const createComponent = createComponentFactory({
    component: RepositoryListComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent({ props: { repositories: MockUserRepos } });

    expect(spectator.component).toBeTruthy();
  });

  it('should render an instance of repositoryItemComponent for each repository', () => {
    expect(spectator.queryAll('rob-repository-item').length).toEqual(
      MockUserRepos.length
    );
  });
});
