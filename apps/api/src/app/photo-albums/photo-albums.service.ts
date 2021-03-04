import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class PhotoAlbumsService extends EntityService {
  constructor(private db: DatabaseService) {
    super(db, 'photo-albums');
  }
}
