import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HomepageBannerComponent } from './homepage-banner.component';

describe('HomepageBannerComponent', () => {
  let spectator: Spectator<HomepageBannerComponent>;
  const createComponent = createComponentFactory(HomepageBannerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  it('should contain a title in a h1 element', () => {
    const expectedText = 'Rob Bailey Software Engineer';
    expect(spectator.query('h1').textContent.trim()).toEqual(expectedText);
  });
});
