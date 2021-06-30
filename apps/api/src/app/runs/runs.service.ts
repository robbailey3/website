import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class RunsService extends EntityService {
  constructor(private db: DatabaseService) {
    super(db, 'runs');
  }
}
