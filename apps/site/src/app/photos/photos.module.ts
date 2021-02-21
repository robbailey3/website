import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosRootComponent } from './photos-root/photos-root.component';
import { AlbumListPageComponent } from './album-list-page/album-list-page.component';
import { AlbumPageComponent } from './album-page/album-page.component';
import { AlbumListingComponent } from './album-listing/album-listing.component';
import { AlbumComponent } from './album/album.component';
import { PhotoListingComponent } from './photo-listing/photo-listing.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    PhotosRootComponent,
    AlbumListPageComponent,
    AlbumPageComponent,
    AlbumListingComponent,
    AlbumComponent,
    PhotoListingComponent,
    PhotoComponent
  ],
  imports: [CommonModule, PhotosRoutingModule]
})
export class PhotosModule {}
