import { Test, TestingModule } from '@nestjs/testing';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../shared/database/database.service';
import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: DatabaseService,
          useValue: {
            isLoaded: new BehaviorSubject(true),
            collection: {
              find: jest.fn(),
              findOne: jest.fn(),
              insertOne: jest.fn()
            }
          }
        }
      ]
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
