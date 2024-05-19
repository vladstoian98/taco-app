import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserModerationComponent } from './admin-user-moderation-component';

describe('AdminUserModerationComponentComponent', () => {
  let component: AdminUserModerationComponent;
  let fixture: ComponentFixture<AdminUserModerationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserModerationComponent]
    });
    fixture = TestBed.createComponent(AdminUserModerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
