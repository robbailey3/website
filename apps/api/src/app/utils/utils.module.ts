import { Module } from '@nestjs/common';
import { FileToolsService } from './file-tools/file-tools.service';
import { ImageToolsService } from './image-tools/image-tools.service';

@Module({
  providers: [FileToolsService, ImageToolsService]
})
export class UtilsModule {}
