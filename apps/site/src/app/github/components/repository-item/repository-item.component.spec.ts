import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RepositoryItemComponent } from './repository-item.component';

describe('RepositoryItemComponent', () => {
  let spectator: Spectator<RepositoryItemComponent>;
  const createComponent = createComponentFactory({
    component: RepositoryItemComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
