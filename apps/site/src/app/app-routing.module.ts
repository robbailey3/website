import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageRootComponent } from './homepage/homepage-root/homepage-root.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageRootComponent,
    data: {
      title: 'Home - Rob Bailey',
      description:
        'The portfolio site for the Software Engineer known as Rob Bailey'
    }
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((res) => res.AboutModule)
  },
  {
    path: 'github',
    loadChildren: () =>
      import('./github/github.module').then((res) => res.GithubModule)
  },
  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then((res) => res.CvModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((res) => res.AdminModule)
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
