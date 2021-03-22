import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { RepositoryListComponent } from './repository-list.component';

describe('RepositoryListComponent', () => {
  let spectator: Spectator<RepositoryListComponent>;
  const createComponent = createComponentFactory({
    component: RepositoryListComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
