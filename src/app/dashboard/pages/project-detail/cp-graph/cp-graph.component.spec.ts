import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpGraphComponent } from './cp-graph.component';

describe('CpGraphComponent', () => {
  let component: CpGraphComponent;
  let fixture: ComponentFixture<CpGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
