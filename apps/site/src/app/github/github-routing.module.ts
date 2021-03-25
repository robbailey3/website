import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubDashboardComponent } from './github-dashboard/github-dashboard.component';
import { GithubRootComponent } from './github-root/github-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GithubRootComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GithubDashboardComponent,
        data: {
          title: 'GitHub profile - Rob Bailey',
          description:
            'A dashboard displaying data retrieved from GitHub.com about the user Rob Bailey'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubRoutingModule {}
