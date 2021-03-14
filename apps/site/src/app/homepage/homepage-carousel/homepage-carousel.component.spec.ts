import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { HomepageCarouselComponent } from './homepage-carousel.component';

describe('HomepageCarouselComponent', () => {
  let spectator: Spectator<HomepageCarouselComponent>;
  let component: HomepageCarouselComponent;

  const componentFactory = createComponentFactory({
    component: HomepageCarouselComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a RobCarousel component', () => {
    expect(spectator.query('rob-carousel')).toBeTruthy();
  });
});
