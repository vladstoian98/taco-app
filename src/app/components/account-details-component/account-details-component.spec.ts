import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsComponentComponent } from './account-details-component';

describe('AccountDetailsComponentComponent', () => {
  let component: AccountDetailsComponentComponent;
  let fixture: ComponentFixture<AccountDetailsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailsComponentComponent]
    });
    fixture = TestBed.createComponent(AccountDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
