import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import MockRepository from '../../../__mocks__/github/github-repository.mock';
import { RepositoryItemComponent } from './repository-item.component';

describe('RepositoryItemComponent', () => {
  let spectator: Spectator<RepositoryItemComponent>;
  const createComponent = createComponentFactory({
    component: RepositoryItemComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent({ props: { repository: MockRepository } });

    expect(spectator.component).toBeTruthy();
  });

  it('should render the repository name in an anchor within a <h2> element', () => {
    expect(spectator.query('h2 > a').textContent.trim()).toEqual(
      MockRepository.name
    );
  });

  it('should set the href attribute of the "h2 a" to the url of the repo', () => {
    expect(spectator.query('h2 > a').getAttribute('href')).toEqual(
      MockRepository.html_url
    );
  });

  it('should render the description in p.repository-description', () => {
    expect(
      spectator.query('p.repository-description').textContent.trim()
    ).toEqual(MockRepository.description);
  });

  it('should render the repository language', () => {
    expect(spectator.query('.repository-language').textContent.trim()).toEqual(
      MockRepository.language
    );
  });

  it('should render the number of forks', () => {
    expect(spectator.query('.repository-forks').textContent.trim()).toEqual(
      MockRepository.forks_count.toString()
    );
  });

  it('should render the number of stars', () => {
    expect(spectator.query('.repository-stars').textContent.trim()).toEqual(
      MockRepository.stargazers_count.toString()
    );
  });

  it('should show the size of the repository in KB', () => {
    expect(spectator.query('.repository-size').textContent.trim()).toEqual(
      `${MockRepository.size.toLocaleString()}KB`
    );
  });
});
