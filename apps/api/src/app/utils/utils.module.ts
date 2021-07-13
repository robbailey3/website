import { Module, Global } from '@nestjs/common';
import { PhotosModule } from '../photos/photos.module';
import { FileToolsService } from './file-tools/file-tools.service';
import { ImageToolsService } from './image-tools/image-tools.service';

@Global()
@Module({
  imports: [PhotosModule],
  providers: [FileToolsService, ImageToolsService],
  exports: [FileToolsService, ImageToolsService]
})
export class UtilsModule {}
