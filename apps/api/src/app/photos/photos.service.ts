import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';
import { ImageToolsService } from '../utils/image-tools/image-tools.service';

@Injectable()
export class PhotosService extends EntityService {
  constructor(
    protected database: DatabaseService,
    private readonly imageToolsService: ImageToolsService
  ) {
    super(database, 'photos');
  }

  public addFileToResizeQueue(file: File) {
    this.imageToolsService.addToQueue(file);
  }
}
