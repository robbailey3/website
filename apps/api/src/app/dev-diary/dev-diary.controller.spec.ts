import { Test, TestingModule } from '@nestjs/testing';
import { DevDiaryController } from './dev-diary.controller';

describe('DevDiaryController', () => {
  let controller: DevDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevDiaryController],
    }).compile();

    controller = module.get<DevDiaryController>(DevDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
