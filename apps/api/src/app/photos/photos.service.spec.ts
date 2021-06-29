import { Test, TestingModule } from '@nestjs/testing';
import { Subject } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { UtilsModule } from '../utils/utils.module';
import { DatabaseService } from '../shared/database/database.service';
import { PhotosService } from './photos.service';
import { ImageToolsService } from '../utils/image-tools/image-tools.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotosService,
        {
          provide: DatabaseService,
          useClass: class MockDB {
            isLoaded = new Subject();
          }
        },
        {
          provide: ImageToolsService,
          useFactory: () => ({})
        }
      ]
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
