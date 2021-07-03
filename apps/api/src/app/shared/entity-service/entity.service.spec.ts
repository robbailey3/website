/* eslint-disable max-classes-per-file */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { ObjectID } from 'mongodb';
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
    (service as any).collection = {
      find: jest
        .fn()
        .mockReturnValue({ toArray: jest.fn().mockReturnValue([1, 2, 3]) }),
      findOne: jest.fn().mockResolvedValue({}),
      countDocuments: jest.fn().mockResolvedValue(10)
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[METHOD]: find', () => {
    it('should be defined', () => {
      expect(service.find).toBeDefined();
    });

    it('should call collection->find', async () => {
      await service.find();

      expect((service as any).collection.find).toHaveBeenCalled();
    });

    it('should pass params to the collection->find method', async () => {
      const filter = { _id: new ObjectID() };
      const options = {};

      await service.find(filter, options);

      expect((service as any).collection.find).toHaveBeenCalledWith(
        filter,
        options
      );
    });

    it('should throw a NotFoundException when the collection->find method returns an empty array', async () => {
      (service as any).collection.find = jest
        .fn()
        .mockReturnValue({ toArray: () => [] });

      await expect(service.find()).rejects.toThrow(NotFoundException);
    });

    it('should resolve to the result of the collection->find method', async () => {
      const result = await service.find();

      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('[METHOD]: findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call collection->findOne', async () => {
      await service.findOne();

      expect((service as any).collection.findOne).toHaveBeenCalled();
    });

    it('should pass params to the collection->findOne method', async () => {
      const filter = { _id: new ObjectID() };
      const options = {};

      await service.findOne(filter, options);

      expect((service as any).collection.findOne).toHaveBeenCalledWith(
        filter,
        options
      );
    });
    it('should throw a NotFoundException when the collection->findOne method returns null', async () => {
      (service as any).collection.findOne = jest.fn().mockReturnValue(null);

      await expect(service.findOne()).rejects.toThrow(NotFoundException);
    });

    it('should resolve to whatever collection->findOne resolves to', async () => {
      await expect(service.findOne()).resolves.toEqual({});
    });
  });

  describe('[METHOD]: countDocuments', () => {
    it('should be defined', () => {
      expect(service.countDocuments).toBeDefined();
    });

    it('should call collection->countDocuments', async () => {
      await service.countDocuments();

      expect((service as any).collection.countDocuments).toHaveBeenCalled();
    });
  });
});
