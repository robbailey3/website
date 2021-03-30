import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProfileComponent } from './profile.component';

import MockUser from '../../../__mocks__/github/github-user.mock';

describe('ProfileComponent', () => {
  let spectator: Spectator<ProfileComponent>;
  const createComponent = createComponentFactory({
    component: ProfileComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent({ props: { user: MockUser } });

    expect(spectator.component).toBeTruthy();
  });

  it('should render the username in a <h1> element', () => {
    expect(spectator.query('h1').textContent).toEqual(MockUser.name);
  });

  it('should render the handle in an anchor', () => {
    expect(spectator.query('.handle').textContent).toEqual(
      `@${MockUser.login}`
    );
  });

  it('should contain an image of my avatar', () => {
    expect(
      spectator.query('.avatar-image img').attributes.getNamedItem('src').value
    ).toEqual(MockUser.avatar_url);
  });

  it('should render the bio in .bio', () => {
    expect(spectator.query('.bio').textContent.trim()).toEqual(MockUser.bio);
  });
});
