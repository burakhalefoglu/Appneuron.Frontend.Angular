import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingStrategyDisplayRateComponent } from './advertising-strategy-display-rate.component';

describe('AdvertisingStrategyDisplayRateComponent', () => {
  let component: AdvertisingStrategyDisplayRateComponent;
  let fixture: ComponentFixture<AdvertisingStrategyDisplayRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingStrategyDisplayRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingStrategyDisplayRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
