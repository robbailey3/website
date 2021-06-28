/* eslint-disable max-classes-per-file */
import { Injectable } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { EntityService } from './entity.service';

// jest.mock('../database/database.service.ts', () => ({
//   getCollection: jest.fn().mockReturnValue({
//     find: jest.fn(),
//     findOne: jest.fn()
//   })
// }));

@Injectable()
class TestEntityService extends EntityService {
  constructor(database: DatabaseService) {
    super(database, 'test');
  }
}

describe('[SERVICE]: EntityService', () => {
  let service: TestEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestEntityService,
        {
          provide: DatabaseService,
          useClass: class MockDatabaseService {
            public getCollection() {
              return {
                find: jest.fn().mockReturnValue({
                  toArray: jest
                    .fn()
                    .mockReturnValue(new Promise((resolve) => resolve(null)))
                }),
                findOne: jest
                  .fn()
                  .mockReturnValue(new Promise((resolve) => resolve(null)))
              };
            }
          }
        }
      ]
    }).compile();

    service = module.get<TestEntityService>(TestEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: getMany', () => {
    it('should call databaseService->find', () => {
      const spy: jest.SpyInstance = jest.spyOn(
        (service as any).collection,
        'find'
      );
      service.find({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: getOne', () => {
    it('should call databaseService->findOne', () => {
      const spy = jest.spyOn((service as any).collection, 'findOne');
      service.findOne({});
      expect(spy).toHaveBeenCalled();
    });
  });
});
