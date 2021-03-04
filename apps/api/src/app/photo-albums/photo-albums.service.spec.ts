import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../shared/database/database.service';
import { PhotoAlbumsService } from './photo-albums.service';

jest.mock('../shared/database/database.service.ts');

describe('PhotoAlbumsService', () => {
  let service: PhotoAlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoAlbumsService, DatabaseService]
    }).compile();

    service = module.get<PhotoAlbumsService>(PhotoAlbumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
