import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CvSkillsComponent } from './cv-skills.component';

describe('CvSkillsComponent', () => {
  let spectator: Spectator<CvSkillsComponent>;
  const createComponent = createComponentFactory(CvSkillsComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
