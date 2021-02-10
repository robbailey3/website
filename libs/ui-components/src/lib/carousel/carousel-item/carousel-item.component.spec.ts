import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemComponent } from './carousel-item.component';

describe('[COMPONENT]: CarouselItemComponent', () => {
  let component: CarouselItemComponent;
  let spectator: Spectator<CarouselItemComponent>;
  const componentFactory = createComponentFactory(CarouselItemComponent);

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
