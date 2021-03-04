import { Module } from '@nestjs/common';
import { PhotoAlbumsService } from './photo-albums.service';
import { PhotoAlbumsController } from './photo-albums.controller';

@Module({
  providers: [PhotoAlbumsService],
  controllers: [PhotoAlbumsController]
})
export class PhotoAlbumsModule {}
