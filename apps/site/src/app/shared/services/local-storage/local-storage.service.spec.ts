import { TestBed } from '@angular/core/testing';
import { NgtUniversalModule } from '@ng-toolkit/universal';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NgtUniversalModule] });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
