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
        .randomBytes(8)
        .toString('hex')
        .replace(/\//g, '_')
        .replace(/\+/g, '-') +
      ext
    );
  };

  constructor(private readonly photosService: PhotosService) {}

  @Get('')
  public getPhotos(
    @Query() query: EntityQuery<PhotoDto>
  ): Observable<PhotoDto[]> {
    const { filter, ...options } = query;

    return this.photosService.find(filter, options);
  }

  @ApiOperation({
    description: 'Uploads new photos into the album',
    summary: 'Upload new photos'
  })
  @ApiParam({
    name: 'id',
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
    FilesInterceptor('files', 100, {
      limits: {
        fileSize: PhotosController.maxFileSize // A 40MB limit per file
      },
      storage: multer.diskStorage({
        destination: PhotosController.fileDestination,
        filename: (req, file, callback) => {
          const name = PhotosController.createFileName(file);
          callback(null, name);
        }
      }),
      fileFilter: (_req, file, callback) => {
        const allowedFileTypes = ['.png', '.jpg', '.jpeg'];
        const allowedMimetypes = ['image/jpeg', 'image/png'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
          callback(new Error(`Incorrect file type: ${fileExtension}`), false);
        }
        if (!allowedMimetypes.includes(file.mimetype)) {
          callback(
            new Error(`Incorrect file mimetype: ${file.mimetype}`),
            false
          );
        }
        callback(null, true);
      }
    })
  )
  public uploadFile(
    @UploadedFiles() files: any[],
    @Param('albumId') _id: string | ObjectId
  ) {
    if (!files) {
      throw new BadRequestException('No files uploaded.');
    }
    files.forEach((file) => {
      // eslint-disable-next-line no-param-reassign
      file.albumID = _id;
      this.photosService.addFileToResizeQueue(file);
    });
  }
}
