import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { UserController } from './user.controller';
import { UserService } from './user.service';

jest.mock('./user.service.ts');

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    service.find = () => new Observable();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: find', () => {
    it('should call userService->find', () => {
      const spy = jest.spyOn(service, 'find');
      controller.find({ limit: 0, skip: 0, sort: {}, filter: {} });
      expect(spy).toHaveBeenCalled();
    });
  });
});
