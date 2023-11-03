import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignTacoComponent } from './design-taco.component';

describe('DesignTacoComponent', () => {
  let component: DesignTacoComponent;
  let fixture: ComponentFixture<DesignTacoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignTacoComponent]
    });
    fixture = TestBed.createComponent(DesignTacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
