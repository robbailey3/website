import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let spectator: Spectator<CardComponent>;
  let component: CardComponent;
  const componentFactory = createComponentFactory(CardComponent);

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
