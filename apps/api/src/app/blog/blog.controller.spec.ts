import { Test, TestingModule } from '@nestjs/testing';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../shared/database/database.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

describe('BlogController', () => {
  let controller: BlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        BlogService,
        {
          provide: DatabaseService,
          useValue: {
            isLoaded: new BehaviorSubject(true),
            collection: {
              find: jest.fn(),
              findOne: jest.fn(),
              insertOne: jest.fn(),
              findOneAndDelete: jest.fn()
            }
          }
        }
      ]
    }).compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
