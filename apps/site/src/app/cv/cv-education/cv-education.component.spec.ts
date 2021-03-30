import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvEducationComponent } from './cv-education.component';

describe('CvEducationComponent', () => {
  let spectator: Spectator<CvEducationComponent>;
  const createComponent = createComponentFactory(CvEducationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
