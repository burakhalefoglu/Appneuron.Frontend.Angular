import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalChurnRateComponent } from './total-churn-rate.component';

describe('TotalChurnRateComponent', () => {
  let component: TotalChurnRateComponent;
  let fixture: ComponentFixture<TotalChurnRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalChurnRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalChurnRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
