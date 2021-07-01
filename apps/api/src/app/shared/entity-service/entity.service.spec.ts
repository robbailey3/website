/* eslint-disable max-classes-per-file */
import { Injectable } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { EntityService } from './entity.service';

@Injectable()
class TestEntityService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'test');
  }
}

describe('[SERVICE]: EntityService', () => {
  let service: TestEntityService;
  let db: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestEntityService,
        {
          provide: DatabaseService,
          useValue: { collection: {}, isLoaded: new BehaviorSubject(true) }
        }
      ]
    }).compile();

    service = module.get<TestEntityService>(TestEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
