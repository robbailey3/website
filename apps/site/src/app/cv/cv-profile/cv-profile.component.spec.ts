import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvProfileComponent } from './cv-profile.component';

describe('CvProfileComponent', () => {
  let spectator: Spectator<CvProfileComponent>;
  const createComponent = createComponentFactory({
    component: CvProfileComponent,
    imports: [FontAwesomeModule]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
