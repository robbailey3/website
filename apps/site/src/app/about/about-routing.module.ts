import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutRootComponent } from './about-root/about-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AboutRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
