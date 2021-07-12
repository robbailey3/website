import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvExperienceComponent } from './cv-experience.component';

describe('CvExperienceComponent', () => {
  let spectator: Spectator<CvExperienceComponent>;
  const createComponent = createComponentFactory({
    component: CvExperienceComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
