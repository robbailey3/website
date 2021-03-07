import { Test, TestingModule } from '@nestjs/testing';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { UtilsModule } from '../utils/utils.module';

jest.mock('./photos.service');

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [PhotosService],
      imports: [UtilsModule]
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
