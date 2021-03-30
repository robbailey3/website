import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GithubService } from '../github.service';

import { GithubDashboardComponent } from './github-dashboard.component';

describe('GithubDashboardComponent', () => {
  let spectator: Spectator<GithubDashboardComponent>;
  const createComponent = createComponentFactory({
    component: GithubDashboardComponent,
    providers: [GithubService],
    imports: [HttpClientTestingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
