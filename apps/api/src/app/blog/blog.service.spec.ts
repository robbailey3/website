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

  describe('[METHOD]: slugifyTitle', () => {
    test.each([
      { title: 'Some Title', expected: 'some-title' },
      { title: 'Once upon a time', expected: 'once-upon-a-time' },
      {
        title: 'Something & some, punctuatioN!',
        expected: 'something-some-punctuation'
      },
      {
        title: 'SoMETHInG, WITH <> WEIR_D CAPITALiSATION',
        expected: 'something-with-weir-d-capitalisation'
      }
    ])('should correctly slugify %o', (testCase) => {
      expect(service.slugifyTitle(testCase.title)).toEqual(testCase.expected);
    });
  });
});
