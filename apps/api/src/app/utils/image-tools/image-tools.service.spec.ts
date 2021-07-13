import { Test, TestingModule } from '@nestjs/testing';
import { FileToolsService } from '../file-tools/file-tools.service';
import { ImageToolsService } from './image-tools.service';

describe('ImageToolsService', () => {
  let service: ImageToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageToolsService, FileToolsService]
    }).compile();

    service = module.get<ImageToolsService>(ImageToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
