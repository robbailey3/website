import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { FileToolsService } from '../file-tools/file-tools.service';
import { ImageToolsService } from './image-tools.service';

describe('ImageToolsService', () => {
  let service: ImageToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageToolsService, FileToolsService],
      imports: [BullModule.registerQueue({ name: 'image-resizer' })]
    }).compile();

    service = module.get<ImageToolsService>(ImageToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
