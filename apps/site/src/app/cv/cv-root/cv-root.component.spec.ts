import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvRootComponent } from './cv-root.component';

describe('CvRootComponent', () => {
  let spectator: Spectator<CvRootComponent>;
  const createComponent = createComponentFactory({
    component: CvRootComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
