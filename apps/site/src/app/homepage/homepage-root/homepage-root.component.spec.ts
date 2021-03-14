import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HomepageBannerComponent } from '../homepage-banner/homepage-banner.component';

import { HomepageRootComponent } from './homepage-root.component';

describe('HomepageRootComponent', () => {
  let spectator: Spectator<HomepageRootComponent>;
  let component: HomepageRootComponent;

  const createComponent = createComponentFactory({
    component: HomepageRootComponent,
    declarations: [HomepageBannerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('should contain the HomepageIntroductionComponent', () => {
    expect(spectator.query('rob-homepage-introduction')).toBeTruthy();
  });

  it('should contain the HomepageCarouselComponent', () => {
    expect(spectator.query('rob-homepage-carousel')).toBeTruthy();
  });

  it('should contain the HomepageTechnologiesComponent', () => {
    expect(spectator.query('rob-homepage-technologies')).toBeTruthy();
  });
});
