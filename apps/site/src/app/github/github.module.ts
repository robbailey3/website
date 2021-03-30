import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiComponentsModule } from '@website/ui-components';
import { GithubRoutingModule } from './github-routing.module';
import { GithubService } from './github.service';
import { GithubRootComponent } from './github-root/github-root.component';
import { GithubDashboardComponent } from './github-dashboard/github-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryItemComponent } from './components/repository-item/repository-item.component';

@NgModule({
  declarations: [
    GithubRootComponent,
    GithubDashboardComponent,
    ProfileComponent,
    RepositoryListComponent,
    RepositoryItemComponent
  ],
  providers: [GithubService],
  imports: [
    CommonModule,
    GithubRoutingModule,
    FontAwesomeModule,
    UiComponentsModule
  ]
})
export class GithubModule {}
