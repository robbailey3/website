import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { PageMetaService } from './page-meta.service';

describe('PageMetaService', () => {
  let spectator: SpectatorService<PageMetaService>;
  const createService = createServiceFactory(PageMetaService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
