import { Test, TestingModule } from '@nestjs/testing';
import { Subject } from 'rxjs';
import { DatabaseService } from '../shared/database/database.service';
import { PhotoAlbumsService } from './photo-albums.service';

describe('PhotoAlbumsService', () => {
  let service: PhotoAlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotoAlbumsService,
        {
          provide: DatabaseService,
          useClass: class MockDB {
            isLoaded = new Subject();
          }
        }
      ]
    }).compile();

    service = module.get<PhotoAlbumsService>(PhotoAlbumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
