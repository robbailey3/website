import * as sharp from 'sharp';
import { Injectable, NotImplementedException } from '@nestjs/common';
import * as exif from 'exif-reader';
import { FileToolsService } from '../file-tools/file-tools.service';

@Injectable()
export class ImageToolsService {
  constructor(private readonly fileToolsService: FileToolsService) {}

  public async resizeToFile(
    source: string,
    destinationDir: string,
    filename: string,
    width: number,
    height: number,
    options: sharp.ResizeOptions = {}
  ): Promise<sharp.OutputInfo> {
    await this.fileToolsService.ensureDir(destinationDir);

    return sharp(source)
      .resize(width, height, options)
      .withMetadata()
      .toFile(destinationDir + filename);
  }

  public async getMeta(image: string | Buffer) {
    const metadata = await sharp(image).metadata();
    if (metadata && metadata.exif) {
      return exif(metadata.exif);
    }
    return null;
  }

  public addToQueue(file: any) {
    throw new NotImplementedException();
  }
}
