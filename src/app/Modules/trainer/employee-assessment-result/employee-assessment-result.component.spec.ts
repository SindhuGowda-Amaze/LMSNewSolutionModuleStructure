import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssessmentResultComponent } from './employee-assessment-result.component';

describe('EmployeeAssessmentResultComponent', () => {
  let component: EmployeeAssessmentResultComponent;
  let fixture: ComponentFixture<EmployeeAssessmentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAssessmentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssessmentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
