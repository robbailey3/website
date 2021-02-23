import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HomepageBannerComponent } from '../homepage-banner/homepage-banner.component';

import { HomepageRootComponent } from './homepage-root.component';

describe('HomepageRootComponent', () => {
  let spectator: Spectator<HomepageRootComponent>;
  const createComponent = createComponentFactory({
    component: HomepageRootComponent,
    declarations: [HomepageBannerComponent]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
