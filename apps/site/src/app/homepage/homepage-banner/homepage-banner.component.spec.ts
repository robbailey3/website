import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HomepageBannerComponent } from './homepage-banner.component';

describe('HomepageBannerComponent', () => {
  let spectator: Spectator<HomepageBannerComponent>;
  const createComponent = createComponentFactory({
    component: HomepageBannerComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  it('should contain a title in a h1 element', () => {
    const expectedText = 'Rob Bailey Software Engineer';
    expect(spectator.query('h1').textContent.trim()).toEqual(expectedText);
  });

  it('should contain a p tag containing the specified text', () => {
    const expectedText =
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi iure labore amet? A, quos incidunt. Nemo similique dicta voluptate, consequatur, quod error quibusdam quam perferendis molestias enim iure quos dolorum!';

    expect(spectator.query('p').textContent.trim()).toEqual(expectedText);
  });
});
