import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class BlogService extends EntityService {
  constructor(db: DatabaseService) {
    super(db, 'blog');
  }
}
