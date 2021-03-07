import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../utils/utils.module';
import { DatabaseService } from '../shared/database/database.service';
import { PhotosService } from './photos.service';

jest.mock('../shared/database/database.service.ts');

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotosService, DatabaseService],
      imports: [UtilsModule]
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
