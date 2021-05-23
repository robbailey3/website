import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('./users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    service.find = () => new Observable();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: find', () => {
    it('should call UsersService->find', () => {
      const spy = jest.spyOn(service, 'find');
      controller.find({ limit: 0, skip: 0, sort: {}, filter: {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: insertUser', () => {
    it('should call UsersService->insertUser', () => {
      const spy = jest
        .spyOn(service, 'insertUser')
        .mockReturnValue(new Observable());
      controller.insertUser(new UserDto());
      expect(spy).toHaveBeenCalled();
    });
  });
});
