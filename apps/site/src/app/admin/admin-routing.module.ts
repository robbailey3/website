import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRootComponent } from './admin-root/admin-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminRootComponent,
    children: [
      { path: '', pathMatch: 'full', component: AdminDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
