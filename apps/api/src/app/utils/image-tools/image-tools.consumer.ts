import * as path from 'path';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PhotoDto } from '../../photos/dto/photo.dto';
import { PhotosService } from '../../photos/photos.service';
import { ImageToolsService } from './image-tools.service';
import { BaseEntity } from '../../shared/base-entity/base-entity';

@Processor('image-resizer')
export class ImageToolsConsumer {
  public dest = `${path.dirname(
    require.main.filename || process.mainModule.filename
  )}/files`;

  constructor(
    private readonly imageToolsService: ImageToolsService,
    private readonly photosService: PhotosService
  ) {}

  @Process('resize')
  public async handleResizeJob(job: Job) {
    try {
      const file = job.data;

      const ext = file.originalname.split('.')[1];

      const thumbName = [
        `${file.filename.split('.')[0]}_thumb`,
        file.filename.split('.')[1]
      ].join('.');

      const fileNameSansExt = file.filename.split('.')[0];

      const largeImage = await this.imageToolsService.resizeToFile(
        file.path,
        `${this.dest}/${file.albumID}/`,
        file.filename,
        1920,
        1920,
        {
          withoutEnlargement: true,
          fit: 'inside'
        }
      );

      const thumb = await this.imageToolsService.resizeToFile(
        file.path,
        `${this.dest}/${file.albumID}/`,
        thumbName,
        50,
        50,
        {
          withoutEnlargement: true,
          fit: 'inside'
        }
      );

      const meta = await this.imageToolsService.getMeta(file.path);

      const dbResult = await this.photosService.insertOne<any>({
        mimeType: file.mimetype,
        src: `${fileNameSansExt}.${ext}`,
        thumbnailSrc: `${fileNameSansExt}_thumb.${ext}`,
        imageDimensions: {
          width: largeImage.width,
          height: largeImage.height
        },
        thumbnailDimensions: {
          width: thumb.width,
          height: thumb.height
        },
        encoding: file.encoding,
        size: largeImage.size,
        thumbnailSize: thumb.size,
        meta
      });

      console.log({ dbResult });
    } catch ($e) {
      console.error($e);
    }
  }
}
