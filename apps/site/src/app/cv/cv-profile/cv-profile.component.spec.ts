import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvProfileComponent } from './cv-profile.component';

describe('CvProfileComponent', () => {
  let spectator: Spectator<CvProfileComponent>;
  const createComponent = createComponentFactory(CvProfileComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
