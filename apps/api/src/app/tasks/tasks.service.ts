import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class TasksService extends EntityService {
  constructor(protected db: DatabaseService) {
    super(db, 'tasks');
  }
}
