import { Test, TestingModule } from '@nestjs/testing';
import { PhotoAlbumsController } from './photo-albums.controller';

describe('PhotoAlbumsController', () => {
  let controller: PhotoAlbumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoAlbumsController],
    }).compile();

    controller = module.get<PhotoAlbumsController>(PhotoAlbumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
