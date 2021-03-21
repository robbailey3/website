import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvExperienceComponent } from './cv-experience.component';

describe('CvExperienceComponent', () => {
  let spectator: Spectator<CvExperienceComponent>;
  const createComponent = createComponentFactory(CvExperienceComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
