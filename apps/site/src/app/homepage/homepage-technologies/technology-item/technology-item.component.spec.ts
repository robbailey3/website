import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TechnologyItemComponent } from './technology-item.component';

describe('TechnologyItemComponent', () => {
  let spectator: Spectator<TechnologyItemComponent>;
  const createComponent = createComponentFactory({
    component: TechnologyItemComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        item: {
          name: 'Tech Item Name',
          logoSrc: '',
          description: 'Lorem'
        }
      }
    });
  });
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
