import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRemoteSettingsComponent } from './offer-remote-settings.component';

describe('OfferRemoteSettingsComponent', () => {
  let component: OfferRemoteSettingsComponent;
  let fixture: ComponentFixture<OfferRemoteSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRemoteSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferRemoteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
