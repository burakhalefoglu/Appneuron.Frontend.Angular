import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferStrategyEffectivenessAnalysisComponent } from './offer-strategy-effectiveness-analysis.component';

describe('OfferStrategyEffectivenessAnalysisComponent', () => {
  let component: OfferStrategyEffectivenessAnalysisComponent;
  let fixture: ComponentFixture<OfferStrategyEffectivenessAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferStrategyEffectivenessAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferStrategyEffectivenessAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
