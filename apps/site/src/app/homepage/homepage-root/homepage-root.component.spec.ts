import { Spectator, createComponentFactory } from '@ngneat/spectator';
import * as e from 'express';
import { HomepageBannerComponent } from '../homepage-banner/homepage-banner.component';

import { HomepageRootComponent } from './homepage-root.component';

describe('HomepageRootComponent', () => {
  let spectator: Spectator<HomepageRootComponent>;
  let component: HomepageRootComponent;

  const createComponent = createComponentFactory({
    component: HomepageRootComponent,
    declarations: [HomepageBannerComponent]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the HomepageBannerComponent', () => {
    expect(spectator.query('rob-homepage-banner')).toBeTruthy();
  });
});
