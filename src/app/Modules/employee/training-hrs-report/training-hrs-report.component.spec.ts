import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHrsReportComponent } from './training-hrs-report.component';

describe('TrainingHrsReportComponent', () => {
  let component: TrainingHrsReportComponent;
  let fixture: ComponentFixture<TrainingHrsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingHrsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingHrsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
