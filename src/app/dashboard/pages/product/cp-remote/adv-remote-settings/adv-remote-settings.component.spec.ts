import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvRemoteSettingsComponent } from './adv-remote-settings.component';

describe('AdvRemoteSettingsComponent', () => {
  let component: AdvRemoteSettingsComponent;
  let fixture: ComponentFixture<AdvRemoteSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvRemoteSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvRemoteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
