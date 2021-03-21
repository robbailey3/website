import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvNavigationComponent } from './cv-navigation.component';

describe('CvNavigationComponent', () => {
  let spectator: Spectator<CvNavigationComponent>;
  const createComponent = createComponentFactory({
    component: CvNavigationComponent,
    imports: [RouterTestingModule]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
