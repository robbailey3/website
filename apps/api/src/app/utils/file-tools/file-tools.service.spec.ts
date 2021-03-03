import { Test, TestingModule } from '@nestjs/testing';
import { FileToolsService } from './file-tools.service';

describe('FileToolsService', () => {
  let service: FileToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileToolsService],
    }).compile();

    service = module.get<FileToolsService>(FileToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
