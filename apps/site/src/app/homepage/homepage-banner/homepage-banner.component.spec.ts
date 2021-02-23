import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HomepageBannerComponent } from './homepage-banner.component';

describe('HomepageBannerComponent', () => {
  let spectator: Spectator<HomepageBannerComponent>;
  const createComponent = createComponentFactory(HomepageBannerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
