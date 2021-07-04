import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class DevDiaryService extends EntityService {
  constructor(protected readonly database: DatabaseService) {
    super(database, 'dev-diary');
  }
}
