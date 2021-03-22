import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { GithubRootComponent } from './github-root.component';

describe('GithubRootComponent', () => {
  let spectator: Spectator<GithubRootComponent>;
  const createComponent = createComponentFactory({
    component: GithubRootComponent,
    imports: [RouterTestingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  it('should contain a router-outlet', () => {
    expect(spectator.query('router-outlet')).toBeTruthy();
  });
});
