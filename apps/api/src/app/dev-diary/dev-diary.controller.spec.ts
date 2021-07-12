import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectID } from 'mongodb';
import { DevDiaryController } from './dev-diary.controller';
import { DevDiaryService } from './dev-diary.service';
import { DiaryEntryDto } from './dto/diary-entry.dto';

jest.mock('./dev-diary.service');

describe('DevDiaryController', () => {
  let controller: DevDiaryController;
  let service: DevDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevDiaryController],
      providers: [DevDiaryService]
    }).compile();

    controller = module.get<DevDiaryController>(DevDiaryController);
    service = module.get<DevDiaryService>(DevDiaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: getEntries', () => {
    it('should be defined', () => {
      expect(controller.getEntries).toBeDefined();
    });

    it('should call devDiaryService->find', () => {
      const spy = jest.spyOn(service, 'find');

      controller.getEntries({ skip: 0, limit: 100, filter: {}, sort: {} });

      expect(spy).toHaveBeenCalled();
    });

    it('should pass the parameters to the service', () => {
      const spy = jest.spyOn(service, 'find');

      const params = { skip: 0, limit: 100, filter: {}, sort: {} };

      controller.getEntries(params);

      const { filter, ...options } = params;

      expect(spy).toHaveBeenCalledWith(filter, options);
    });
  });

  describe('[METHOD]: getSingleEntry', () => {
    let validID;
    let spy;
    const invalidID = 'invalid_id';
    beforeEach(() => {
      validID = new ObjectID().toHexString();
      spy = jest.spyOn(service, 'findOne');
    });
    it('should have a findOne method', () => {
      expect(controller.getSingleEntry).toBeDefined();
    });
    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.getSingleEntry(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.getSingleEntry(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call devDiaryService->findOne', () => {
      controller.getSingleEntry(validID);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: createEntry', () => {
    it('should have a createEntry method', () => {
      expect(controller.createEntry).toBeDefined();
    });

    it('should call devDiaryService->insertOne', () => {
      const spy = jest.spyOn(service, 'insertOne');

      controller.createEntry(new DiaryEntryDto());

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: updateEntry', () => {
    let validID;
    let spy;
    const invalidID = 'invalid_id';
    beforeEach(() => {
      validID = new ObjectID().toHexString();
      spy = jest.spyOn(service, 'findOneAndUpdate');
    });
    it('should have a updateEntry method', () => {
      expect(controller.updateEntry).toBeDefined();
    });

    it('should throw an error when an invalid ID is passed', () => {
      expect(() =>
        controller.updateEntry(invalidID, new DiaryEntryDto())
      ).toThrow(BadRequestException);
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() =>
        controller.updateEntry(validID, new DiaryEntryDto())
      ).not.toThrow(BadRequestException);
    });

    it('should call devDiaryService->findOneAndUpdate', () => {
      controller.updateEntry(validID, new DiaryEntryDto());

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: deleteEntry', () => {
    let validID;
    let spy;
    const invalidID = 'invalid_id';
    beforeEach(() => {
      validID = new ObjectID().toHexString();
      spy = jest.spyOn(service, 'findOneAndDelete');
    });

    it('should be defined', () => {
      expect(controller.deleteEntry).toBeDefined();
    });

    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.deleteEntry(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.deleteEntry(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call devDiaryService->deleteOne', () => {
      controller.deleteEntry(validID);

      expect(spy).toHaveBeenCalled();
    });
  });
});
