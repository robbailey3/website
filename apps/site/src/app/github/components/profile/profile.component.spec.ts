import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let spectator: Spectator<ProfileComponent>;
  const createComponent = createComponentFactory({
    component: ProfileComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
