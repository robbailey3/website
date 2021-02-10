import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('./auth.service.ts');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD: login]', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(service, 'login');
    });
    it('should be defined', () => {
      expect(controller.login).toBeDefined();
    });
    it('should call authService->login', () => {
      controller.login({ user: {} });
      expect(spy).toHaveBeenCalled();
    });

    it('should pass the user from the request to authService->login', () => {
      const mockRequest = { user: { email: 'test@test.com' } };
      controller.login(mockRequest);
      expect(spy).toHaveBeenCalledWith(mockRequest.user);
    });
  });
});
