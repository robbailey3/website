/* eslint-disable max-classes-per-file */
import { Injectable } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { EntityService } from './entity.service';

jest.mock('../database/database.service.ts');

@Injectable()
class TestEntityService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'test');
  }
}

describe('[SERVICE]: EntityService', () => {
  let service: TestEntityService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestEntityService, DatabaseService]
    }).compile();

    service = module.get<TestEntityService>(TestEntityService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    databaseService.setCollection = (_collectionName: string) => {
      return databaseService;
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: getMany', () => {
    it('should call databaseService->find', () => {
      const spy: jest.SpyInstance = jest.spyOn(databaseService, 'find');
      service.find({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: getOne', () => {
    it('should call databaseService->findOne', () => {
      const spy = jest.spyOn(databaseService, 'findOne');
      service.findOne({});
      expect(spy).toHaveBeenCalled();
    });
  });
});
