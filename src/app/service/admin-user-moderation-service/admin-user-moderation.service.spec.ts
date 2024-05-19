import { TestBed } from '@angular/core/testing';

import { AdminUserModerationService } from './admin-user-moderation.service';

describe('AdminUserModerationService', () => {
  let service: AdminUserModerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserModerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
