import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssessmentReportComponent } from './employee-assessment-report.component';

describe('EmployeeAssessmentReportComponent', () => {
  let component: EmployeeAssessmentReportComponent;
  let fixture: ComponentFixture<EmployeeAssessmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAssessmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
