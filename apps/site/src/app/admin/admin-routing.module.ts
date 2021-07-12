import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRootComponent } from './admin-root/admin-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminDashboardComponent,
        data: {
          title: 'Admin - Rob Bailey',
          description: `The admin pages of Rob Bailey's portfolio site`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
