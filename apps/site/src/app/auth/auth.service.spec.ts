import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  let service: AuthService;

  const serviceFactory = createServiceFactory({
    service: AuthService,
    imports: [HttpClientModule]
  });

  beforeEach(() => {
    spectator = serviceFactory();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[METHOD]: login', () => {
    it('should pass the email and password to the HTTP Post Request', () => {
      const spy = jest.spyOn((service as any).http, 'post');
      const params = { email: 'test@test.com', password: 'password1' };
      service.login(params.email, params.password);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        `${(service as any).API_URL}/login`,
        params
      );
    });
  });
});
