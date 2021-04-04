import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { UiComponentsModule } from '@website/ui-components';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;
  let component: FooterComponent;

  const componentFactory = createComponentFactory({
    component: FooterComponent,
    imports: [RouterTestingModule, FontAwesomeModule, UiComponentsModule]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test.each([
    { text: 'Home', url: '/', index: 0 },
    { text: 'About', url: '/about', index: 1 },
    { text: 'GitHub Profile', url: '/github', index: 2 },
    { text: 'CV', url: '/cv', index: 3 },
    { text: 'Login', url: '/login', index: 4 }
  ])('should render the link %o', (expectedLink) => {
    expect(
      spectator.queryAll('.footer-navigation a')[expectedLink.index].textContent
    ).toEqual(expectedLink.text);

    expect(
      spectator
        .queryAll('.footer-navigation a')
        [expectedLink.index].getAttribute('href')
    ).toEqual(expectedLink.url);
  });

  test.each([
    { text: 'GitHub', url: 'https://github.com/robbailey3', index: 0 },
    {
      text: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/7959497/rob-bailey',
      index: 1
    },
    {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/robbailey3',
      index: 2
    },
    { text: 'Twitter', url: 'https://twitter.com/rob_bailey3', index: 3 },
    {
      text: 'Instagram',
      url: 'https://www.instagram.com/robbailey3/',
      index: 4
    }
  ])('should render the link %o', (expectedLink) => {
    expect(
      spectator.queryAll('.footer-social a')[expectedLink.index].textContent
    ).toEqual(expectedLink.text);

    expect(
      spectator
        .queryAll('.footer-social a')
        [expectedLink.index].getAttribute('href')
    ).toEqual(expectedLink.url);
  });
});
