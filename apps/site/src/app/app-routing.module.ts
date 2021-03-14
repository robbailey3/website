import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageRootComponent } from './homepage/homepage-root/homepage-root.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageRootComponent },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((res) => res.AboutModule)
  },
  {
    path: 'photos',
    loadChildren: () =>
      import('./photos/photos.module').then((res) => res.PhotosModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
