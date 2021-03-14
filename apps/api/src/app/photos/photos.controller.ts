import { Observable } from 'rxjs';
import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import { ObjectId } from 'bson';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Query,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  BadRequestException
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth
} from '@nestjs/swagger';
import { PhotoUploadDto } from './dto/photo-upload.dto';
import { PhotosService } from './photos.service';
import { PhotoDto } from './dto/photo.dto';
import { EntityQuery } from '../shared/entity-query/entity-query';

@Controller('photos')
@ApiTags('Photos')
export class PhotosController {
  public static maxFileSize = 1024 * 1024 * 40;

  public static fileDestination = `${path.dirname(
    require.main.filename || process.mainModule.filename
  )}\\tmp\\uploads`;

  public static createFileName = (file) => {
    const ext = path.extname(file.originalname);
    return (
      Date.now() +
      crypto
        .randomBytes(4)
        .toString('hex')
        .replace(/\//g, '_')
        .replace(/\+/g, '-') +
      ext
    );
  };

  public static allowedFiletypes = ['.jpg', '.png', '.jpeg'];

  public static allowedMimetypes = ['image/jpeg', 'image/png'];

  public static maxPhotosPerUpload = 100;

  constructor(private readonly photosService: PhotosService) {}

  @Get('')
  public getPhotos(
    @Query() query: EntityQuery<PhotoDto>
  ): Observable<PhotoDto[]> {
    const { filter, ...options } = query;

    return this.photosService.find(filter, options);
  }

  // TODO: Look into how the below method can be cleaned up
  @ApiOperation({
    description: 'Uploads new photos into the album',
    summary: 'Upload new photos'
  })
  @ApiParam({
    name: 'albumId',
    type: 'string',
    description: 'The ID of the photo album to which photos should be added'
  })
  @ApiBody({
    type: PhotoUploadDto,
    description: 'The photo files to add to the photo album'
  })
  @ApiConsumes('multipart/form-data')
  @Post(':albumId/upload')
  @ApiBearerAuth()
  @UseInterceptors(
    FilesInterceptor('files', PhotosController.maxPhotosPerUpload, {
      limits: {
        fileSize: PhotosController.maxFileSize // A 40MB limit per file
      },
      storage: multer.diskStorage({
        destination: PhotosController.fileDestination,
        filename: (_req, file, callback) => {
          callback(null, PhotosController.createFileName(file));
        }
      }),
      fileFilter: (_req, file, callback) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (!PhotosController.allowedFiletypes.includes(fileExtension)) {
          callback(
            new BadRequestException(`Incorrect file type: ${fileExtension}`),
            false
          );
        }
        if (!PhotosController.allowedMimetypes.includes(file.mimetype)) {
          callback(
            new BadRequestException(
              `Incorrect file mimetype: ${file.mimetype}`
            ),
            false
          );
        }
        callback(null, true);
      }
    })
  )
  public uploadFile(
    @UploadedFiles()
    files: { albumID: string | ObjectId }[] & Express.Multer.File[],
    @Param('albumId') _id: string | ObjectId
  ) {
    if (!files) {
      throw new BadRequestException('No files uploaded.');
    }
    files.forEach((file: any) => {
      // eslint-disable-next-line no-param-reassign
      file.albumID = _id;
      this.photosService.addFileToResizeQueue(file);
    });
  }
}
