import { ObjectID } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { UtilsModule } from '../utils/utils.module';

jest.mock('./photos.service');

describe('PhotosController', () => {
  let controller: PhotosController;
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [PhotosService]
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: uploadFile', () => {
    it('should be defined', () => {
      expect(controller.uploadFile).toBeDefined();
    });
    it('should call photosService->addFileToResizeQueue', () => {
      const spy = jest.spyOn(service, 'addFileToResizeQueue');
      controller.uploadFile([{ path: '' }], new ObjectID());
      expect(spy).toHaveBeenCalled();
    });
  });
});
