import { Test, TestingModule } from '@nestjs/testing';
import { ImageToolsService } from './image-tools.service';

describe('ImageToolsService', () => {
  let service: ImageToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageToolsService],
    }).compile();

    service = module.get<ImageToolsService>(ImageToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
