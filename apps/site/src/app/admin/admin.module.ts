import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [AdminRootComponent, AdminDashboardComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
