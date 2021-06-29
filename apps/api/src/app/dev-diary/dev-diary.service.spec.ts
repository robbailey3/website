import { Test, TestingModule } from '@nestjs/testing';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../shared/database/database.service';
import { DevDiaryService } from './dev-diary.service';

describe('DevDiaryService', () => {
  let service: DevDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevDiaryService,
        {
          provide: DatabaseService,
          useFactory: () => ({ isLoaded: new BehaviorSubject(true) })
        }
      ]
    }).compile();

    service = module.get<DevDiaryService>(DevDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
