import { Test, TestingModule } from '@nestjs/testing';
import { RunsController } from './runs.controller';
import { RunsService } from './runs.service';

describe('RunsController', () => {
  let controller: RunsController;
  let service: RunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunsController],
      providers: [{ provide: RunsService, useValue: { find: jest.fn() } }]
    }).compile();

    controller = module.get<RunsController>(RunsController);
    service = module.get<RunsService>(RunsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: getRuns', () => {
    it('should be defined', () => {
      expect(controller.getRuns).toBeDefined();
    });

    it('should call runsService->find', () => {
      const spy = jest.spyOn(service, 'find');

      controller.getRuns({ limit: 0, skip: 0, sort: {}, filter: {} });

      expect(spy).toHaveBeenCalled();
    });
  });
});
