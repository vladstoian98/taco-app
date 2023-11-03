import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacoListComponent } from './taco-list.component';

describe('TacoListComponent', () => {
  let component: TacoListComponent;
  let fixture: ComponentFixture<TacoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacoListComponent]
    });
    fixture = TestBed.createComponent(TacoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
