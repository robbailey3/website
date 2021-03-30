import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../shared/database/database.service';
import { DevDiaryService } from './dev-diary.service';

jest.mock('../shared/database/database.service');

describe('DevDiaryService', () => {
  let service: DevDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevDiaryService, DatabaseService]
    }).compile();

    service = module.get<DevDiaryService>(DevDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set the collection name to "dev-diary"', () => {
    // eslint-disable-next-line dot-notation
    expect(service['collectionName']).toEqual('dev-diary');
  });
});
