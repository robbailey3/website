import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CvSkillItemComponent } from '../cv-skill-item/cv-skill-item.component';

import { CvSkillsComponent } from './cv-skills.component';

describe('CvSkillsComponent', () => {
  let spectator: Spectator<CvSkillsComponent>;
  const createComponent = createComponentFactory({
    component: CvSkillsComponent,
    declarations: [CvSkillItemComponent]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
