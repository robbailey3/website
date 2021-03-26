import { Test, TestingModule } from '@nestjs/testing';
import { DevDiaryService } from './dev-diary.service';

describe('DevDiaryService', () => {
  let service: DevDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevDiaryService],
    }).compile();

    service = module.get<DevDiaryService>(DevDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
